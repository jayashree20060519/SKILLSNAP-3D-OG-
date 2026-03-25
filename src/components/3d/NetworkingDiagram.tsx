// @ts-nocheck
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface NetworkNode {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  description: string;
  type: 'router' | 'switch' | 'server' | 'device';
}

const nodes: NetworkNode[] = [
  {
    id: 'router',
    position: [0, 2, 0],
    label: 'Router',
    color: '#ef4444',
    description: 'Routes packets between networks using IP addresses',
    type: 'router'
  },
  {
    id: 'switch1',
    position: [-3, 0, 0],
    label: 'Switch 1',
    color: '#f59e0b',
    description: 'Connects devices within a network using MAC addresses',
    type: 'switch'
  },
  {
    id: 'switch2',
    position: [3, 0, 0],
    label: 'Switch 2',
    color: '#f59e0b',
    description: 'Secondary switch for network redundancy',
    type: 'switch'
  },
  {
    id: 'server',
    position: [0, -2, 0],
    label: 'Server',
    color: '#8b5cf6',
    description: 'Application server handling requests',
    type: 'server'
  },
  {
    id: 'device1',
    position: [-5, -2, 0],
    label: 'Device 1',
    color: '#3b82f6',
    description: 'End user device (computer)',
    type: 'device'
  },
  {
    id: 'device2',
    position: [5, -2, 0],
    label: 'Device 2',
    color: '#3b82f6',
    description: 'End user device (laptop)',
    type: 'device'
  }
];

const connections = [
  { from: 'router', to: 'switch1' },
  { from: 'router', to: 'switch2' },
  { from: 'switch1', to: 'server' },
  { from: 'switch2', to: 'server' },
  { from: 'switch1', to: 'device1' },
  { from: 'switch2', to: 'device2' }
];

function DataPacket({ from, to, delay, active }: { from: [number, number, number]; to: [number, number, number]; delay: number; active: boolean }) {
  const ref = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (!ref.current || !active) return;
    const time = state.clock.getElapsedTime();
    const adjustedTime = (time + delay) % 2.5;
    const t = adjustedTime / 2.5;

    ref.current.position.x = THREE.MathUtils.lerp(from[0], to[0], t);
    ref.current.position.y = THREE.MathUtils.lerp(from[1], to[1], t);
    ref.current.position.z = THREE.MathUtils.lerp(from[2], to[2], t);
    
    // Pulse effect
    const scale = 0.12 + Math.sin(time * 8) * 0.03;
    ref.current.scale.setScalar(scale);
  });

  if (!active) return null;

  return (
    <Box ref={ref} args={[0.12, 0.12, 0.12]}>
      <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
    </Box>
  );
}

function NetworkNode({ node, onClick, isSelected }: { node: NetworkNode; onClick: () => void; isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = isSelected ? 1.3 : hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    
    // Gentle rotation when selected or hovered
    if (isSelected || hovered) {
      meshRef.current.rotation.y += 0.015;
    }
  });

  const getShape = () => {
    switch (node.type) {
      case 'router':
        return (
          <group>
            <Box args={[1.2, 0.4, 0.8]} />
            <Cylinder args={[0.05, 0.05, 0.6, 8]} position={[0, 0.4, 0]} />
          </group>
        );
      case 'switch':
        return <Box args={[1, 0.3, 0.7]} />;
      case 'server':
        return (
          <group>
            <Box args={[0.8, 1.2, 0.6]} />
            <Box args={[0.6, 0.1, 0.1]} position={[0, 0.3, 0.31]} />
            <Box args={[0.6, 0.1, 0.1]} position={[0, 0, 0.31]} />
            <Box args={[0.6, 0.1, 0.1]} position={[0, -0.3, 0.31]} />
          </group>
        );
      case 'device':
        return <Box args={[0.8, 0.6, 0.1]} />;
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
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.28}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>
      {isSelected && (
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.1} />
        </Sphere>
      )}
    </group>
  );
}

function ConnectionLine({ from, to, active }: { from: [number, number, number]; to: [number, number, number]; active: boolean }) {
  return (
    <Line
      points={[from, to]}
      color={active ? "#22c55e" : "#64748b"}
      lineWidth={active ? 3 : 2}
      transparent
      opacity={active ? 0.8 : 0.4}
    />
  );
}

export function NetworkingDiagram({ onNodeClick }: { onNodeClick: (node: NetworkNode) => void }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());

  useFrame((state) => {
    // Cycle through connections to show packet flow
    const time = Math.floor(state.clock.getElapsedTime() / 2) % connections.length;
    const conn = connections[time];
    setActiveConnections(new Set([`${conn.from}-${conn.to}`]));
  });

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node.id);
    onNodeClick(node);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
      <spotLight position={[0, 5, 5]} angle={0.5} intensity={0.5} color="#3b82f6" />

      {/* Connection Lines */}
      {connections.map((conn, idx) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return null;
        const isActive = activeConnections.has(`${conn.from}-${conn.to}`);
        return (
          <ConnectionLine
            key={idx}
            from={fromNode.position}
            to={toNode.position}
            active={isActive}
          />
        );
      })}

      {/* Animated Data Packets */}
      {connections.map((conn, idx) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return null;
        const isActive = activeConnections.has(`${conn.from}-${conn.to}`);
        return (
          <DataPacket
            key={idx}
            from={fromNode.position}
            to={toNode.position}
            delay={idx * 0.3}
            active={isActive}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          onClick={() => handleNodeClick(node)}
          isSelected={selectedNode === node.id}
        />
      ))}
    </>
  );
}
