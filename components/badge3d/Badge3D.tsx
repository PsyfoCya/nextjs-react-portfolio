"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import { createBadgeTexture } from "./badgeFace";
import { LanyardStrap } from "./lanyardStrap";

/**
 * Scratch vectors, allocated once for the lifetime of the module.
 *
 * The frame loop runs sixty times a second; the version in PR #1 called
 * `new THREE.Vector3()` half a dozen times per frame, which is a few hundred
 * throwaway objects a second handed to the garbage collector for no reason.
 */
const pointerTarget = new THREE.Vector3();
const cameraRay = new THREE.Vector3();
const ropeTarget = new THREE.Vector3();
const angularVelocity = new THREE.Vector3();
const cardQuaternion = new THREE.Quaternion();
const claspOffset = new THREE.Vector3();
const cardRotation = new THREE.Euler();

interface BandProps {
  texture: THREE.Texture;
  /** Bounds on how fast the rope catches up to the physics bodies. */
  minSpeed?: number;
  maxSpeed?: number;
}

const Band = ({ texture, minSpeed = 6, maxSpeed = 24 }: BandProps) => {
  const [strap] = useState(() => new LanyardStrap(32, 0.16));
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  // The rope is drawn through a smoothed copy of the two middle joints rather
  // than their raw positions, which would jitter at physics-step boundaries.
  const smoothed = useRef({
    j1: new THREE.Vector3(),
    j2: new THREE.Vector3(),
    seeded: false,
  });

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => () => strap.dispose(), [strap]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) {
      return;
    }

    if (dragged) {
      // Project the pointer onto the plane the card is floating in.
      pointerTarget.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      cameraRay.copy(pointerTarget).sub(state.camera.position).normalize();
      pointerTarget.add(cameraRay.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: pointerTarget.x - dragged.x,
        y: pointerTarget.y - dragged.y,
        z: pointerTarget.z - dragged.z,
      });
    }

    const smooth = smoothed.current;
    const j1Pos = j1.current.translation();
    const j2Pos = j2.current.translation();

    if (!smooth.seeded) {
      smooth.j1.set(j1Pos.x, j1Pos.y, j1Pos.z);
      smooth.j2.set(j2Pos.x, j2Pos.y, j2Pos.z);
      smooth.seeded = true;
    }

    // Catch up faster the further behind the rope has fallen, so a hard fling
    // stays attached while a resting badge settles smoothly.
    const chase = (target: THREE.Vector3, x: number, y: number, z: number) => {
      ropeTarget.set(x, y, z);
      const distance = Math.max(0.1, Math.min(1, target.distanceTo(ropeTarget)));
      // Clamped, and this clamp is load-bearing. `lerp` extrapolates for any
      // alpha above 1, so on a slow frame a large `delta` makes the smoothed
      // rope points overshoot their targets instead of converging on them.
      // That diverges within a few frames and flings the strap off in a random
      // direction while the card itself, driven by real physics, hangs
      // perfectly still.
      const alpha = Math.min(
        1,
        delta * (minSpeed + distance * (maxSpeed - minSpeed))
      );
      target.lerp(ropeTarget, alpha);
    };
    chase(smooth.j1, j1Pos.x, j1Pos.y, j1Pos.z);
    chase(smooth.j2, j2Pos.x, j2Pos.y, j2Pos.z);

    const fixedPos = fixed.current.translation();

    // Anchor the strap on the clasp rather than on j3, which sits a little
    // above it — otherwise the ribbon stops short and leaves a visible gap.
    // Rotating the offset keeps it attached when the card tilts.
    const cardPos = card.current.translation();
    const cardRot = card.current.rotation();
    cardQuaternion.set(cardRot.x, cardRot.y, cardRot.z, cardRot.w);
    claspOffset.set(0, 1.16, 0).applyQuaternion(cardQuaternion);
    curve.points[0].set(
      cardPos.x + claspOffset.x,
      cardPos.y + claspOffset.y,
      cardPos.z + claspOffset.z
    );
    curve.points[1].copy(smooth.j2);
    curve.points[2].copy(smooth.j1);
    curve.points[3].set(fixedPos.x, fixedPos.y, fixedPos.z);

    strap.update(curve);

    // Ease the card back towards the camera instead of letting it spin freely.
    const angvel = card.current.angvel();
    angularVelocity.set(angvel.x, angvel.y, angvel.z);
    // cardQuaternion still holds this frame's card rotation from above.
    cardRotation.setFromQuaternion(cardQuaternion);
    card.current.setAngvel(
      {
        x: angularVelocity.x,
        y: angularVelocity.y - cardRotation.y * 0.25,
        z: angularVelocity.z,
      },
      true
    );
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        {[j1, j2, j3].map((ref, index) => (
          <RigidBody
            key={index}
            ref={ref}
            // Strung straight down rather than out to the side: this canvas is
            // a narrow gutter column, so a horizontal start throws the badge
            // clean out of frame before gravity brings it back.
            position={[0.15 * (index + 1), -1 * (index + 1), 0]}
            angularDamping={2}
            linearDamping={2}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
        ))}

        <RigidBody
          ref={card}
          position={[0.45, -4.45, 0]}
          type={dragged ? "kinematicPosition" : "dynamic"}
          angularDamping={2}
          linearDamping={2}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              const pos = card.current!.translation();
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(ropeTarget.set(pos.x, pos.y, pos.z))
              );
            }}
          >
            {/* Card body */}
            <mesh>
              <boxGeometry args={[1.6, 2.25, 0.02]} />
              <meshPhysicalMaterial
                color="#0b0f1f"
                metalness={0.45}
                roughness={0.35}
                clearcoat={0.6}
                clearcoatRoughness={0.25}
              />
            </mesh>

            {/* Printed face */}
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                map={texture}
                roughness={0.4}
                metalness={0.1}
                clearcoat={0.5}
                clearcoatRoughness={0.3}
              />
            </mesh>

            {/* Clasp joining the card to the lanyard */}
            <mesh position={[0, 1.16, 0]}>
              <torusGeometry args={[0.09, 0.025, 12, 32]} />
              <meshStandardMaterial color="#b9c0d4" metalness={1} roughness={0.25} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Lanyard */}
      <mesh geometry={strap.geometry}>
        <meshStandardMaterial
          color="#7179ef"
          side={THREE.DoubleSide}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>
    </>
  );
};

export interface Badge3DProps {
  name?: string;
  title?: string;
  meta?: string;
  photoUrl?: string;
  /**
   * When false the canvas stops rendering and the physics world stops
   * stepping. The scene is otherwise live from mount to unmount, so scrolling
   * past the badge left a WebGL context and a rigid-body simulation running at
   * 60fps for the rest of the visit.
   */
  running?: boolean;
}

const Badge3D = ({
  name = "Siyabonga Hadebe",
  title = "Frontend Developer",
  meta = "JOHANNESBURG · ZA",
  photoUrl = "/assets/images/me/psyfo-badge.png",
  running = true,
}: Badge3DProps) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let stale = false;
    let created: THREE.Texture | null = null;

    createBadgeTexture({ name, title, meta, photoUrl }).then((result) => {
      created = result;
      if (stale) {
        result.dispose();
        return;
      }
      setTexture(result);
    });

    return () => {
      stale = true;
      created?.dispose();
    };
  }, [name, title, meta, photoUrl]);

  // Nothing to render until the face is painted; the wrapper shows a skeleton.
  if (!texture) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      // Uncapped DPR on a 3x phone or a 5K display renders nine times the
      // pixels for no visible gain and drains battery.
      dpr={[1, 1.75]}
      // "never" halts the render loop outright; the scene resumes exactly where
      // it left off when the badge scrolls back in.
      frameloop={running ? "always" : "never"}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!running}>
        <Band texture={texture} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
};

export default Badge3D;
