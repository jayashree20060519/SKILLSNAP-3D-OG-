// @ts-nocheck
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface CloudNode {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  description: string;
  type: 'device' | 'internet' | 'cloud' | 'database';
}

const nodes: CloudNode[] = [
  {
    id: 'laptop',
    position: [-6, 0, 0],
    label: 'User Device',
    color: '#3b82f6',
    description: 'Client devices (laptop, mobile) sending requests',
    type: 'device'
  },
  {
    id: 'internet',
    position: [-2, 0, 0],
    label: 'Internet',
    color: '#8b5cf6',
    description: 'Network layer connecting users to cloud',
    type: 'internet'
  },
  {
    id: 'cloud1',
    position: [2, 1.5, 0],
    label: 'Cloud Server 1',
    color: '#06b6d4',
    description: 'Application server processing requests',
    type: 'cloud'
  },
  {
    id: 'cloud2',
    position: [2, -1.5, 0],
    label: 'Cloud Server 2',
    color: '#06b6d4',
    description: 'Load-balanced application server',
    type: 'cloud'
  },
  {
    id: 'database',
    position: [6, 0, 0],
    label: 'Database',
    color: '#10b981',
    description: 'Data storage and retrieval',
    type: 'database'
  }
];

const connections = [
  { from: 'laptop', to: 'internet' },
  { from: 'internet', to: 'cloud1' },
  { from: 'internet', to: 'cloud2' },
  { from: 'cloud1', to: 'database' },
  { from: 'cloud2', to: 'database' }
];

function AnimatedDataPacket({ from, to, delay }: { from: [number, number, number]; to: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Mesh>();
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const adjustedTime = (time + delay) % 3;
    const t = adjustedTime / 3;
    setProgress(t);

    ref.current.position.x = THREE.MathUtils.lerp(from[0], to[0], t);
    ref.current.position.y = THREE.MathUtils.lerp(from[1], to[1], t);
    ref.current.position.z = THREE.MathUtils.lerp(from[2], to[2], t);
    ref.current.scale.setScalar(0.15 + Math.sin(time * 5) * 0.05);
  });

  return (
    <Sphere ref={ref} args={[0.15, 16, 16]}>
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
    </Sphere>
  );
}

function CloudNode({ node, onClick, isSelected }: { node: CloudNode; onClick: () => void; isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = isSelected ? 1.3 : hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    
    if (isSelected || hovered) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  const getShape = () => {
    switch (node.type) {
      case 'device':
        return <Box args={[1, 0.7, 0.1]} />;
      case 'internet':
        return <Sphere args={[0.6, 32, 32]} />;
      case 'cloud':
        return <Box args={[1.2, 0.8, 0.8]} />;
      case 'database':
        return (
          <group>
            <Box args={[1, 0.3, 1]} position={[0, 0.3, 0]} />
            <Box args={[1, 0.3, 1]} position={[0, 0, 0]} />
            <Box args={[1, 0.3, 1]} position={[0, -0.3, 0]} />
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
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>
    </group>
  );
}

function ConnectionLine({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  return (
    <Line
      points={[from, to]}
      color="#6366f1"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
}

export function CloudComputingDiagram({ onNodeClick }: { onNodeClick: (node: CloudNode) => void }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (node: CloudNode) => {
    setSelectedNode(node.id);
    onNodeClick(node);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

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

      {/* Animated Data Packets */}
      {connections.map((conn, idx) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return null;
        return (
          <AnimatedDataPacket
            key={idx}
            from={fromNode.position}
            to={toNode.position}
            delay={idx * 0.5}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <CloudNode
          key={node.id}
          node={node}
          onClick={() => handleNodeClick(node)}
          isSelected={selectedNode === node.id}
        />
      ))}
    </>
  );
}
