"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
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
import {
  createCardBack,
  createCardFront,
  createLanyardTexture,
} from "./cardFace";
import CardSkeleton from "./CardSkeleton";
import StaticCard from "./StaticCard";
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

/**
 * CR80 proportions, matching the canvas in cardFace. These five numbers are
 * coupled — the geometry, the collider, the clasp offset and the joint anchor
 * all assume them, so they move together or the strap detaches from the card.
 */
const CARD_W = 2.1;
const CARD_H = 3.33;
const CARD_D = 0.03;
const CARD_RADIUS = 0.18;
/** Where the strap meets the card. Just above the top edge. */
const CLASP_Y = CARD_H / 2 + 0.33;

interface BandProps {
  front: THREE.Texture;
  back: THREE.Texture;
  lanyard: THREE.Texture;
  /** Bounds on how fast the rope catches up to the physics bodies. */
  minSpeed?: number;
  maxSpeed?: number;
}

const Band = ({
  front,
  back,
  lanyard,
  minSpeed = 6,
  maxSpeed = 24,
}: BandProps) => {
  const [strap] = useState(() => new LanyardStrap(32, 0.44));
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

  // The four control points are held directly rather than reached for through
  // `curve.points[n]` each frame: same objects, but no indexing in the hot loop.
  const [{ curve, clasp, midLower, midUpper, anchor }] = useState(() => {
    const clasp = new THREE.Vector3();
    const midLower = new THREE.Vector3();
    const midUpper = new THREE.Vector3();
    const anchor = new THREE.Vector3();

    const curve = new THREE.CatmullRomCurve3([
      clasp,
      midLower,
      midUpper,
      anchor,
    ]);
    curve.curveType = "chordal";

    return { curve, clasp, midLower, midUpper, anchor };
  });

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.66]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.66]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.66]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CLASP_Y + 0.29, 0],
  ]);

  useEffect(() => () => strap.dispose(), [strap]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current
    ) {
      return;
    }

    if (dragged) {
      // Project the pointer onto the plane the card is floating in.
      pointerTarget
        .set(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera);
      cameraRay.copy(pointerTarget).sub(state.camera.position).normalize();
      pointerTarget.add(
        cameraRay.multiplyScalar(state.camera.position.length())
      );

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
    // stays attached while a resting card settles smoothly.
    const chase = (target: THREE.Vector3, x: number, y: number, z: number) => {
      ropeTarget.set(x, y, z);
      const distance = Math.max(
        0.1,
        Math.min(1, target.distanceTo(ropeTarget))
      );
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
    claspOffset.set(0, CLASP_Y, 0).applyQuaternion(cardQuaternion);
    clasp.set(
      cardPos.x + claspOffset.x,
      cardPos.y + claspOffset.y,
      cardPos.z + claspOffset.z
    );
    midLower.copy(smooth.j2);
    midUpper.copy(smooth.j1);
    anchor.set(fixedPos.x, fixedPos.y, fixedPos.z);

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
      <group position={[0, 4.2, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        {[j1, j2, j3].map((ref, index) => (
          <RigidBody
            key={index}
            ref={ref}
            // Strung straight down rather than out to the side: this canvas is
            // a narrow gutter column, so a horizontal start throws the card
            // clean out of frame before gravity brings it back.
            position={[0.12 * (index + 1), -0.66 * (index + 1), 0]}
            angularDamping={2}
            linearDamping={2}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
        ))}

        <RigidBody
          ref={card}
          position={[0.35, -3.4, 0]}
          type={dragged ? "kinematicPosition" : "dynamic"}
          angularDamping={2}
          linearDamping={2}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, CARD_D / 2]} />
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
            {/*
              The edge of the card. RoundedBox rather than a box, so the
              silhouette is a real badge outline instead of a sharp rectangle.
              Its UVs are not a clean 0-1 rectangle, so the artwork stays on
              the two planes below and this only ever shows as the edge.
            */}
            <RoundedBox
              args={[CARD_W, CARD_H, CARD_D]}
              radius={CARD_RADIUS}
              smoothness={4}
            >
              <meshPhysicalMaterial
                color="#0e1428"
                metalness={0.2}
                roughness={0.45}
                clearcoat={1}
                clearcoatRoughness={0.12}
              />
            </RoundedBox>

            {/*
              Printed front. `transparent` matters: the artwork's corners are
              clipped to the same radius as the body, so the plane reads as
              card-shaped rather than overhanging it.
            */}
            <mesh position={[0, 0, CARD_D / 2 + 0.001]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshPhysicalMaterial
                map={front}
                transparent
                roughness={0.28}
                metalness={0.05}
                clearcoat={1}
                clearcoatRoughness={0.06}
                iridescence={0.35}
                iridescenceIOR={1.32}
                iridescenceThicknessRange={[100, 480]}
              />
            </mesh>

            {/* Printed back, turned to face the other way. */}
            <mesh
              position={[0, 0, -(CARD_D / 2 + 0.001)]}
              rotation={[0, Math.PI, 0]}
            >
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshPhysicalMaterial
                map={back}
                transparent
                roughness={0.42}
                metalness={0.02}
                clearcoat={0.9}
                clearcoatRoughness={0.14}
                iridescence={0.18}
                iridescenceIOR={1.25}
              />
            </mesh>

            {/*
              The clip assembly, in the order a real badge is put together:
              a bail through the punched slot, a split ring above it, and the
              webbing clamp that the lanyard is folded into. Previously a
              single torus floated free of the slot, which is what made the
              join read as unfinished.
            */}
            <group position={[0, CARD_H / 2 - 0.02, 0]}>
              {/* Bail — the flat tab passing through the slot. */}
              <mesh position={[0, 0.02, 0]}>
                <boxGeometry args={[0.3, 0.14, 0.05]} />
                <meshStandardMaterial
                  color="#aeb4c4"
                  metalness={1}
                  roughness={0.3}
                />
              </mesh>

              {/* Split ring linking bail to clamp. */}
              <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.085, 0.019, 12, 32]} />
                <meshStandardMaterial
                  color="#d3d8e4"
                  metalness={1}
                  roughness={0.18}
                />
              </mesh>

              {/* Webbing clamp — where the lanyard is folded and crimped. */}
              <mesh position={[0, 0.29, 0]}>
                <boxGeometry args={[0.24, 0.13, 0.07]} />
                <meshStandardMaterial
                  color="#9aa1b2"
                  metalness={1}
                  roughness={0.34}
                />
              </mesh>
              <mesh position={[0, 0.345, 0]}>
                <boxGeometry args={[0.26, 0.03, 0.09]} />
                <meshStandardMaterial
                  color="#7d8496"
                  metalness={1}
                  roughness={0.4}
                />
              </mesh>
            </group>
          </group>
        </RigidBody>
      </group>

      {/* Lanyard */}
      <mesh geometry={strap.geometry}>
        <meshStandardMaterial
          map={lanyard}
          side={THREE.DoubleSide}
          roughness={0.72}
          metalness={0.03}
        />
      </mesh>
    </>
  );
};

export interface AccessCard3DProps {
  name?: string;
  title?: string;
  meta?: string;
  /** Printed under the barcode. Decorative. */
  serial?: string;
  /** Encoded into the QR on the back. */
  qrUrl?: string;
  /**
   * When false the canvas stops rendering and the physics world stops
   * stepping. The scene is otherwise live from mount to unmount, so scrolling
   * past the card left a WebGL context and a rigid-body simulation running at
   * 60fps for the rest of the visit.
   */
  running?: boolean;
}

interface CardTextures {
  front: THREE.Texture;
  back: THREE.Texture;
  lanyard: THREE.Texture;
}

const AccessCard3D = ({
  name = "Siyabonga Hadebe",
  title = "Frontend Developer",
  meta = "JOHANNESBURG · ZA",
  serial = "SH-2024-0417",
  qrUrl = "/assets/images/me/access-card-qr.png",
  running = true,
}: AccessCard3DProps) => {
  const [textures, setTextures] = useState<CardTextures | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let stale = false;
    let created: CardTextures | null = null;

    Promise.all([
      createCardFront({ name, title, meta, serial }),
      createCardBack({ qrUrl, serial }),
    ])
      .then(([front, back]) => {
        const result = { front, back, lanyard: createLanyardTexture(name) };
        created = result;
        if (stale) {
          Object.values(result).forEach((texture) => texture.dispose());
          return;
        }
        setTextures(result);
      })
      .catch((error) => {
        // Without this the rejection is unhandled and `textures` stays null
        // forever, so the stage renders an empty box with no clue why.
        // eslint-disable-next-line no-console
        console.error("Access card texture failed to paint:", error);
        if (!stale) setFailed(true);
      });

    return () => {
      stale = true;
      if (created) {
        Object.values(created).forEach((texture) => texture.dispose());
      }
    };
  }, [name, title, meta, serial, qrUrl]);

  // The face is painted to a canvas before the scene can use it. Hold the
  // skeleton until it lands rather than returning null, which would leave a
  // blank hole where the card should be.
  if (failed) return <StaticCard />;
  if (!textures) return <CardSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 1.5, 11.5], fov: 28 }}
      // Uncapped DPR on a 3x phone or a 5K display renders nine times the
      // pixels for no visible gain and drains battery.
      dpr={[1, 1.75]}
      // "demand" rather than "never" when paused: "never" renders nothing at
      // all, so a canvas that mounted while off screen would stay blank until
      // something scrolled it back. "demand" still draws the frame it is asked
      // for and then stops, which is what we actually want.
      frameloop={running ? "always" : "demand"}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!running}>
        <Band
          front={textures.front}
          back={textures.back}
          lanyard={textures.lanyard}
        />
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

export default AccessCard3D;
