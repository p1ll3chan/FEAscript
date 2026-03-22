import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Node, SpringElement, BarElement, TrussElement, SolverResult } from '../lib/fem/types';

interface Props {
  nodes: Node[];
  elements: (SpringElement | BarElement | TrussElement)[];
  result: SolverResult | null;
  domain: 'spring' | 'bar' | 'truss';
}

const scaleDisp = 1.0; // Scale factor for displacements to make them visible if needed

const AnimatedTruss: React.FC<Props> = ({ nodes, elements, result, domain }) => {
  // We calculate original positions and displaced positions
  const originalPos = useMemo(() => {
    return nodes.map(n => new THREE.Vector3(n.x, n.y || 0, 0));
  }, [nodes]);

  const displacedPos = useMemo(() => {
    if (!result) return originalPos;
    return nodes.map((n, i) => {
      let dx = 0;
      let dy = 0;
      if (domain === 'truss') {
        dx = result.displacements[i * 2] * scaleDisp;
        dy = result.displacements[i * 2 + 1] * scaleDisp;
      } else {
        dx = result.displacements[i] * scaleDisp;
      }
      return new THREE.Vector3(n.x + dx, (n.y || 0) + dy, 0);
    });
  }, [nodes, result, domain]);

  // Center the camera roughly
  const center = useMemo(() => {
    if (nodes.length === 0) return new THREE.Vector3(0, 0, 0);
    const sum = originalPos.reduce((acc, pos) => acc.add(pos), new THREE.Vector3());
    return sum.divideScalar(nodes.length);
  }, [originalPos, nodes.length]);

  return (
    <group position={[-center.x, -center.y, 0]}>
      {/* Original State (Ghosted) */}
      {elements.map((el, i) => {
        const p1 = originalPos[el.node1 - 1];
        const p2 = originalPos[el.node2 - 1];
        if (!p1 || !p2) return null;
        return (
          <Line
            key={`orig-el-${i}`}
            points={[p1, p2]}
            color="rgba(148, 163, 184, 0.3)"
            lineWidth={3}
            dashed
          />
        );
      })}

      {nodes.map((_, i) => {
        const p = originalPos[i];
        if (!p) return null;
        return (
          <Sphere key={`orig-node-${i}`} position={p} args={[0.2, 16, 16]}>
            <meshStandardMaterial color="rgba(148, 163, 184, 0.3)" transparent={true} opacity={0.5} />
          </Sphere>
        );
      })}

      {/* Displaced State (Solid) */}
      {result && elements.map((el, i) => {
        const p1 = displacedPos[el.node1 - 1];
        const p2 = displacedPos[el.node2 - 1];
        if (!p1 || !p2) return null;
        
        let forceColor = '#38bdf8'; // Default Blue
        if (result.internalForces[i] > 1e-6) forceColor = '#4ade80'; // Tension Green
        else if (result.internalForces[i] < -1e-6) forceColor = '#f87171'; // Compression Red

        return (
          <Line
            key={`disp-el-${i}`}
            points={[p1, p2]}
            color={forceColor}
            lineWidth={5}
          />
        );
      })}

      {result && nodes.map((n, i) => {
        const p = displacedPos[i];
        if (!p) return null;
        return (
          <group key={`disp-node-group-${i}`} position={p}>
            <Sphere args={[0.3, 16, 16]}>
              <meshStandardMaterial color="#38bdf8" />
            </Sphere>
            <Text position={[0, 0.6, 0]} fontSize={0.5} color="white">
              N{n.id}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const Visualizer3D: React.FC<Props> = (props) => {
  return (
    <div style={{ width: '100%', height: '400px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', border: '1px solid var(--panel-border)', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedTruss {...props} />
        <OrbitControls makeDefault enablePan enableZoom enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Visualizer3D;
