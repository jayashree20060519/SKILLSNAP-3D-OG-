// @ts-nocheck
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line, Sphere, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface IoTNode {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  description: string;
  type: 'sensor' | 'gateway' | 'cloud' | 'app';
}

const nodes: IoTNode[] = [
  {
    id: 'sensor1',
    position: [-6, 1.5, 0],
    label: 'Temp Sensor',
    color: '#f59e0b',
    description: 'Temperature sensor collecting environmental data',
    type: 'sensor'
  },
  {
    id: 'sensor2',
    position: [-6, -1.5, 0],
    label: 'Motion Sensor',
    color: '#f59e0b',
    description: 'Motion detector for security and automation',
    type: 'sensor'
  },
  {
    id: 'gateway',
    position: [-2, 0, 0],
    label: 'IoT Gateway',
    color: '#8b5cf6',
    description: 'Gateway aggregating sensor data and connecting to cloud',
    type: 'gateway'
  },
  {
    id: 'cloud',
    position: [2, 0, 0],
    label: 'Cloud Platform',
    color: '#06b6d4',
    description: 'Cloud service processing and storing IoT data',
    type: 'cloud'
  },
  {
    id: 'app',
    position: [6, 0, 0],
    label: 'Mobile App',
    color: '#10b981',
    description: 'User interface for monitoring and control',
    type: 'app'
  }
];

const connections = [
  { from: 'sensor1', to: 'gateway' },
  { from: 'sensor2', to: 'gateway' },
  { from: 'gateway', to: 'cloud' },
  { from: 'cloud', to: 'app' }
];

function SignalWave({ from, to, delay }: { from: [number, number, number]; to: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const adjustedTime = (time + delay) % 3;
    const t = adjustedTime / 3;

    ref.current.position.x = THREE.MathUtils.lerp(from[0], to[0], t);
    ref.current.position.y = THREE.MathUtils.lerp(from[1], to[1], t);
    ref.current.position.z = THREE.MathUtils.lerp(from[2], to[2], t);
    
    // Pulsing effect
    const scale = 0.15 + Math.sin(time * 6 + delay) * 0.05;
    ref.current.scale.setScalar(scale);
    
    // Fade out as it approaches destination
    const opacity = 1 - t * 0.5;
    if (ref.current.material) {
      ref.current.material.opacity = opacity;
    }
  });

  return (
    <Sphere ref={ref} args={[0.15, 16, 16]}>
      <meshStandardMaterial
        color="#ec4899"
        emissive="#ec4899"
        emissiveIntensity={0.8}
        transparent
        opacity={1}
      />
    </Sphere>
  );
}

function IoTNode({ node, onClick, isSelected }: { node: IoTNode; onClick: () => void; isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = isSelected ? 1.3 : hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    
    // Sensors pulse
    if (node.type === 'sensor') {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      meshRef.current.scale.multiplyScalar(pulse);
    }
    
    if (isSelected || hovered) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  const getShape = () => {
    switch (node.type) {
      case 'sensor':
        return (
          <group>
            <Cylinder args={[0.3, 0.4, 0.6, 16]} />
            <Sphere args={[0.2, 16, 16]} position={[0, 0.4, 0]} />
          </group>
        );
      case 'gateway':
        return (
          <group>
            <Box args={[1, 0.6, 0.8]} />
            <Cylinder args={[0.05, 0.05, 0.5, 8]} position={[0, 0.5, 0]} />
            <Sphere args={[0.1, 8, 8]} position={[0, 0.75, 0]} />
          </group>
        );
      case 'cloud':
        return (
          <group>
            <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]} />
            <Sphere args={[0.4, 32, 32]} position={[-0.4, 0.2, 0]} />
            <Sphere args={[0.4, 32, 32]} position={[0.4, 0.2, 0]} />
            <Sphere args={[0.3, 32, 32]} position={[0, 0.4, 0]} />
          </group>
        );
      case 'app':
        return (
          <group>
            <Box args={[0.6, 1, 0.1]} />
            <Box args={[0.4, 0.6, 0.12]} position={[0, 0.1, 0]} />
          </group>
        );
      default:
        return <Box args={[1, 1, 1]} />;
    }
  };

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getShape()}
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isSelected ? 0.7 : hovered ? 0.5 : 0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <Text
        position={[0, -1.3, 0]}
        fontSize={0.28}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>
      {/* Signal rings for sensors */}
      {node.type === 'sensor' && (
        <SignalRings position={[0, 0, 0]} />
      )}
    </group>
  );
}

function SignalRings({ position }: { position: [number, number, number] }) {
  const ring1Ref = useRef<THREE.Mesh>();
  const ring2Ref = useRef<THREE.Mesh>();
  const ring3Ref = useRef<THREE.Mesh>();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    [ring1Ref, ring2Ref, ring3Ref].forEach((ref, idx) => {
      if (!ref.current) return;
      const offset = idx * 0.5;
      const scale = 1 + ((time + offset) % 2) * 0.5;
      const opacity = 1 - ((time + offset) % 2) * 0.5;
      ref.current.scale.set(scale, scale, 1);
      if (ref.current.material) {
        ref.current.material.opacity = opacity * 0.3;
      }
    });
  });

  return (
    <group position={position}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ConnectionLine({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const lineRef = useRef<THREE.Line>();

  useFrame((state) => {
    if (!lineRef.current) return;
    const opacity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    if (lineRef.current.material) {
      lineRef.current.material.opacity = opacity;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[from, to]}
      color="#ec4899"
      lineWidth={2}
      transparent
      opacity={0.5}
      dashed
      dashScale={20}
      dashSize={0.5}
      gapSize={0.3}
    />
  );
}

export function IoTDiagram({ onNodeClick }: { onNodeClick: (node: IoTNode) => void }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (node: IoTNode) => {
    setSelectedNode(node.id);
    onNodeClick(node);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <spotLight position={[0, 5, 5]} angle={0.5} intensity={0.5} color="#06b6d4" />

      {/* Connection Lines */}
      {connections.map((conn, idx) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return null;
        return (
          <ConnectionLine
            key={idx}
            from={fromNode.position}
            to={toNode.position}
          />
        );
      })}

      {/* Animated Signal Waves */}
      {connections.map((conn, idx) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return null;
        return (
          <SignalWave
            key={idx}
            from={fromNode.position}
            to={toNode.position}
            delay={idx * 0.6}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <IoTNode
          key={node.id}
          node={node}
          onClick={() => handleNodeClick(node)}
          isSelected={selectedNode === node.id}
        />
      ))}
    </>
  );
}
