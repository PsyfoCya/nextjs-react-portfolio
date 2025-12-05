"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody, BallCollider, CuboidCollider } from "@react-three/rapier";
import { useTexture, Environment, Lightformer, Text } from "@react-three/drei";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

// Extend R3F with MeshLine components
extend({ MeshLineGeometry, MeshLineMaterial });

// Declare JSX types for meshline
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { points?: Float32Array };
      meshLineMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        transparent?: boolean;
        opacity?: number;
        color?: string | THREE.Color;
        depthTest?: boolean;
        resolution?: [number, number];
        lineWidth?: number;
      };
    }
  }
}

interface BandProps {
  profileImage?: string;
  userName?: string;
  userTitle?: string;
}

// Band component with physics
function Band({ profileImage = "/assets/images/me/Psyfo.png", userName = "Siyabonga Hadebe", userTitle = "Software Developer" }: BandProps) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]));
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Load profile texture
  const profileTexture = useTexture(profileImage);

  // Create joints connecting the segments
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current) {
      // Calculate curve points from joint positions
      [j1, j2].forEach((ref) => {
        if (!(ref.current as any)?.lerped) {
          const pos = ref.current?.translation();
          if (pos) {
            (ref.current as any).lerped = new THREE.Vector3(pos.x, pos.y, pos.z);
          }
        }
      });

      // Smoothly interpolate joint positions
      const j1Pos = j1.current.translation();
      const j2Pos = j2.current.translation();

      if ((j1.current as any).lerped && (j2.current as any).lerped) {
        (j1.current as any).lerped.lerp(
          new THREE.Vector3(j1Pos.x, j1Pos.y, j1Pos.z),
          delta * 10
        );
        (j2.current as any).lerped.lerp(
          new THREE.Vector3(j2Pos.x, j2Pos.y, j2Pos.z),
          delta * 10
        );
      }

      // Update curve points
      const fixedPos = fixed.current.translation();
      const j3Pos = j3.current.translation();

      curve.points[0].copy(new THREE.Vector3(fixedPos.x, fixedPos.y, fixedPos.z));
      curve.points[1].copy((j1.current as any).lerped || new THREE.Vector3(j1Pos.x, j1Pos.y, j1Pos.z));
      curve.points[2].copy((j2.current as any).lerped || new THREE.Vector3(j2Pos.x, j2Pos.y, j2Pos.z));
      curve.points[3].copy(new THREE.Vector3(j3Pos.x, j3Pos.y, j3Pos.z));

      // Update meshline geometry
      if (band.current) {
        const geometry = band.current.geometry as any;
        if (geometry.setPoints) {
          geometry.setPoints(curve.getPoints(32));
        }
      }
    }

    // Apply angular damping to card when not dragged
    if (card.current && !dragged) {
      const cardVel = card.current.angvel();
      ang.set(cardVel.x, cardVel.y, cardVel.z);
      rot.copy(ang).normalize().multiplyScalar(-0.1);
      card.current.applyTorqueImpulse({ x: rot.x, y: rot.y, z: rot.z }, true);
    }
  });

  // Set cursor style
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => { document.body.style.cursor = "auto"; };
    }
  }, [hovered, dragged]);

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Fixed anchor point */}
        <RigidBody ref={fixed} type="fixed" />

        {/* Chain joints */}
        <RigidBody ref={j1} position={[0.5, 0, 0]} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* The badge card */}
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? "kinematicPosition" : "dynamic"}
          angularDamping={2}
          linearDamping={2}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -0.25, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              if (card.current) {
                const cardPos = card.current.translation();
                drag(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(cardPos.x, cardPos.y, cardPos.z)));
              }
            }}
          >
            {/* Card base with gradient effect */}
            <mesh>
              <boxGeometry args={[0.72, 1, 0.02]} />
              <meshStandardMaterial
                color="#0a0a1a"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Card face background */}
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[0.68, 0.96]} />
              <meshStandardMaterial
                color="#0f0f2a"
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>

            {/* Profile image with circular mask */}
            <mesh position={[0, 0.22, 0.015]}>
              <circleGeometry args={[0.18, 64]} />
              <meshBasicMaterial map={profileTexture} />
            </mesh>

            {/* Profile border ring */}
            <mesh position={[0, 0.22, 0.014]}>
              <ringGeometry args={[0.18, 0.21, 64]} />
              <meshBasicMaterial color="#e94560" />
            </mesh>

            {/* Name text placeholder bar */}
            <mesh position={[0, -0.05, 0.015]}>
              <planeGeometry args={[0.55, 0.06]} />
              <meshBasicMaterial color="#e94560" />
            </mesh>

            {/* Title bar */}
            <mesh position={[0, -0.15, 0.015]}>
              <planeGeometry args={[0.45, 0.04]} />
              <meshBasicMaterial color="#533483" />
            </mesh>

            {/* Decorative bottom elements */}
            <mesh position={[0, -0.26, 0.015]}>
              <planeGeometry args={[0.5, 0.02]} />
              <meshBasicMaterial color="#0f3460" />
            </mesh>
            <mesh position={[0, -0.32, 0.015]}>
              <planeGeometry args={[0.35, 0.02]} />
              <meshBasicMaterial color="#16213e" />
            </mesh>

            {/* Lanyard hole */}
            <mesh position={[0, 0.46, 0.015]}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshBasicMaterial color="#1a1a3e" />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* The lanyard band */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={1}
          color="#e94560"
          depthTest={false}
          resolution={[width, height]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// Loading component
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshBasicMaterial color="#1a1a2e" transparent opacity={0.5} />
    </mesh>
  );
}

interface Badge3DProps {
  className?: string;
  profileImage?: string;
  userName?: string;
  userTitle?: string;
}

export default function Badge3D({
  className,
  profileImage = "/assets/images/me/Psyfo.png",
  userName = "Siyabonga Hadebe",
  userTitle = "Software Developer"
}: Badge3DProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          <Physics gravity={[0, -40, 0]} timeStep={1/60}>
            <Band
              profileImage={profileImage}
              userName={userName}
              userTitle={userTitle}
            />
          </Physics>
        </Suspense>

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
    </div>
  );
}
