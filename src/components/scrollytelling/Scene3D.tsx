'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { MotionValue } from 'framer-motion';

interface Scene3DProps {
  currentSection: number;
  progress: number;
  scrollYProgress: MotionValue<number>;
}

function getComputedStyleColor(varName: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  const resolved = value.trim();
  return resolved || fallback;
}

export default function Scene3D({ currentSection, progress, scrollYProgress }: Scene3DProps) {
  const groupRef = useRef<Group>(null);
  const singleStairRef = useRef<Group>(null);
  const doubleEgressRef = useRef<Group>(null);

  // Building components
  const SingleStairBuilding = () => (
    <group ref={singleStairRef} position={[-3, 0, 0]}>
      {/* Main building structure */}
      <Box args={[2, 4, 2]} position={[0, 2, 0]}>
        <meshStandardMaterial color={getComputedStyleColor('--color-brand-600', '#4A90E2')} />
      </Box>
      
      {/* Single stair */}
      <Box args={[0.5, 4, 0.5]} position={[1.25, 2, 0]}>
        <meshStandardMaterial color={getComputedStyleColor('--status-studying', '#7B68EE')} />
      </Box>
      
      {/* Floor indicators */}
      {[0.5, 1.5, 2.5, 3.5].map((y, index) => (
        <Box key={index} args={[2.2, 0.1, 2.2]} position={[0, y, 0]}>
          <meshStandardMaterial color={getComputedStyleColor('--color-content-primary', '#2C3E50')} />
        </Box>
      ))}
      
      {/* Windows */}
      {[1, 2, 3].map((floor) => (
        <group key={floor}>
          <Box args={[0.3, 0.4, 0.05]} position={[-0.8, floor, 1.05]}>
            <meshStandardMaterial color={getComputedStyleColor('--color-brand-500', '#87CEEB')} transparent opacity={0.7} />
          </Box>
          <Box args={[0.3, 0.4, 0.05]} position={[0.8, floor, 1.05]}>
            <meshStandardMaterial color={getComputedStyleColor('--color-brand-500', '#87CEEB')} transparent opacity={0.7} />
          </Box>
        </group>
      ))}
    </group>
  );

  const DoubleEgressBuilding = () => (
    <group ref={doubleEgressRef} position={[3, 0, 0]}>
      {/* Main building structure */}
      <Box args={[2, 4, 2]} position={[0, 2, 0]}>
        <meshStandardMaterial color={getComputedStyleColor('--status-failed', '#E74C3C')} />
      </Box>
      
      {/* Double stairs */}
      <Box args={[0.4, 4, 0.4]} position={[-1.2, 2, 0]}>
        <meshStandardMaterial color={getComputedStyleColor('--status-failed', '#C0392B')} />
      </Box>
      <Box args={[0.4, 4, 0.4]} position={[1.2, 2, 0]}>
        <meshStandardMaterial color={getComputedStyleColor('--status-failed', '#C0392B')} />
      </Box>
      
      {/* Floor indicators */}
      {[0.5, 1.5, 2.5, 3.5].map((y, index) => (
        <Box key={index} args={[2.2, 0.1, 2.2]} position={[0, y, 0]}>
          <meshStandardMaterial color={getComputedStyleColor('--color-content-primary', '#2C3E50')} />
        </Box>
      ))}
      
      {/* Fewer windows due to stair space */}
      {[1, 2, 3].map((floor) => (
          <Box key={floor} args={[0.3, 0.4, 0.05]} position={[0, floor, 1.05]}>
          <meshStandardMaterial color={getComputedStyleColor('--color-brand-500', '#87CEEB')} transparent opacity={0.7} />
        </Box>
      ))}
    </group>
  );

  const LightRays = () => (
    <group>
      {[1, 2, 3].map((floor) => (
        <group key={floor}>
          <Cylinder 
            args={[0.05, 0.05, 3]} 
            position={[-3, floor, 2]} 
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshBasicMaterial color={getComputedStyleColor('--status-introduced', '#FFD700')} transparent opacity={0.6} />
          </Cylinder>
          <Cylinder 
            args={[0.05, 0.05, 3]} 
            position={[-3, floor + 0.3, 2]} 
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshBasicMaterial color={getComputedStyleColor('--status-introduced', '#FFD700')} transparent opacity={0.4} />
          </Cylinder>
        </group>
      ))}
    </group>
  );

  const VentilationArrows = () => (
    <group>
      {[1, 2, 3].map((floor) => (
        <group key={floor}>
          <Cylinder 
            args={[0.03, 0.03, 2]} 
            position={[-3, floor, -2]} 
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshBasicMaterial color={getComputedStyleColor('--status-passed-both', '#00CED1')} transparent opacity={0.8} />
          </Cylinder>
          {/* Arrow head */}
          <Box args={[0.2, 0.1, 0.1]} position={[-2, floor, -2]}>
            <meshBasicMaterial color={getComputedStyleColor('--status-passed-both', '#00CED1')} />
          </Box>
        </group>
      ))}
    </group>
  );

  // Animation based on current section
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Rotate buildings slightly for visual interest
    if (singleStairRef.current) {
      singleStairRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
    
    if (doubleEgressRef.current) {
      doubleEgressRef.current.rotation.y = Math.sin(time * 0.2 + Math.PI) * 0.1;
    }

    // Section-specific animations
    switch (currentSection) {
      case 0: // Introduction
        groupRef.current.rotation.y = 0;
        groupRef.current.position.y = 0;
        break;
      case 1: // Comparison
        groupRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.5;
        break;
      case 2: // Light & Ventilation
        groupRef.current.position.y = Math.sin(progress * Math.PI) * 0.5;
        break;
      case 3: // Fire Safety
        groupRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.2;
        break;
      case 4: // Call to Action
        groupRef.current.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.1);
        break;
    }
  });

  const showLightRays = currentSection === 2;
  const showVentilation = currentSection === 2;
  const showDoubleEgress = currentSection >= 1;

  return (
    <group ref={groupRef}>
      <SingleStairBuilding />
      {showDoubleEgress && <DoubleEgressBuilding />}
      {showLightRays && <LightRays />}
      {showVentilation && <VentilationArrows />}
      
      {/* Ground plane */}
      <Box args={[12, 0.1, 8]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color={getComputedStyleColor('--status-signed', '#2ECC71')} />
      </Box>
    </group>
  );
}


