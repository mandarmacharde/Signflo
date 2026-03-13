import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface SignAvatarProps {
  isAnimating: boolean;
  textToSign: string;
}

// A simple placeholder avatar since we don't have a real GLB
const PlaceholderAvatar = ({ isAnimating, textToSign }: { isAnimating: boolean, textToSign: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smoothly interpolate the arm rotation based on the recognized sign
    let targetRotationX = 0;
    let targetRotationZ = 0;
    
    if (isAnimating && textToSign) {
       switch(textToSign.toLowerCase()) {
         case 'hello':
           // Waving motion
           const t = state.clock.getElapsedTime();
           targetRotationX = -Math.PI / 4;
           targetRotationZ = Math.sin(t * 8) * 0.5 - 0.5;
           break;
         case 'peace':
           targetRotationX = -Math.PI / 2; // Arm up
           targetRotationZ = -0.2;
           break;
         case 'good':
           targetRotationX = -Math.PI / 3; // Thumbs up roughly
           targetRotationZ = 0.5;
           break;
         case 'one':
         case 'fist':
           targetRotationX = -Math.PI / 2;
           targetRotationZ = 0;
           break;
         default:
           // Slight idle motion if detecting
           const t2 = state.clock.getElapsedTime();
           targetRotationZ = Math.sin(t2 * 2) * 0.1;
           break;
       }
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetRotationX, 0.1);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetRotationZ, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <Sphere args={[0.5, 32, 32]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#E8B4A6" />
      </Sphere>
      
      {/* Torso */}
      <Box args={[1.2, 1.5, 0.6]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#2d3748" />
      </Box>

      {/* Left Arm */}
      <Box args={[0.3, 1.2, 0.3]} position={[-0.8, 0.5, 0]}>
        <meshStandardMaterial color="#E8B4A6" />
      </Box>
      <Box args={[0.2, 0.4, 0.1]} position={[-0.8, -0.2, 0]}>
         <meshStandardMaterial color="#E8B4A6" />
      </Box>

      {/* Right Arm Container for easy pivot centered at shoulder */}
      <group position={[0.8, 0.8, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#E8B4A6" />
        </mesh>
      </group>
    </group>
  );
};

export const SignAvatar: React.FC<SignAvatarProps> = ({ isAnimating, textToSign }) => {
  // Use textToSign for dummy rendering logic to satisfy typescript and prepare for real integration
  console.log("Avatar is preparing to sign:", textToSign);
  
  return (
    <div className="w-full h-full relative group">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        <PlaceholderAvatar isAnimating={isAnimating} textToSign={textToSign} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] bg-black/50 px-3 py-1 rounded-full text-white/50 backdrop-blur-md">
           Drag to rotate 3D Avatar
        </span>
      </div>
    </div>
  );
};

export default SignAvatar;
