import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { angleToRadians } from "../utils/angle";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Car } from "./Car";

/* eslint-disable react/no-unknown-property */
function Three() {
  const orbitControlRef = useRef(null);

  // Code to move the camera around
  useFrame((state) => {
    if (orbitControlRef.current) {
      const { x, y } = state.mouse;
      orbitControlRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlRef.current.update();
    }
  });

  // Animation
  const ballRef = useRef(null);
  useEffect(() => {
    if (ballRef.current) {
      // Timeline
      const timeline = gsap.timeline();

      // x-axis motion
      gsap.to(ballRef.current.position, {
        x: 1,
        duration: 2,
        ease: "power3.out",
      });

      // y-axis motion
      gsap.to(
        ballRef.current.position,
        {
          y: 0.5,
          duration: 1,
          ease: "bounce.out",
        },
        "<"
      );

      // Play
      timeline.play();
    }
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* Ball */}
      <mesh ref={ballRef} position={[-2, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Car */}
      <mesh>
        <Car />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>

      {/* Ambient light */}
      <ambientLight args={["#ffffff, 0.25"]} />

      {/* Spot light*/}
      <spotLight
        args={["#ffffff", 10, 7, angleToRadians(45), 0.4]}
        position={[-3, 1, 1]}
        castShadow
      />

      {/* Environments */}
      <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.BackSide} color="#2266cc" />
        </mesh>
      </Environment>
    </>
  );
}

export default Three;
