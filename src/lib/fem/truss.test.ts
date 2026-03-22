import { describe, it, expect } from 'vitest';
import { solveTruss2DSystem } from './truss2d';
import type { Node, TrussElement } from './types';

describe('2D Truss Solver', () => {
  it('solves a simple 2-member truss correctly', () => {
    const nodes: Node[] = [
      { id: 1, x: 0, y: 0, fixedX: true, fixedY: true },
      { id: 2, x: 0, y: 10, fixedX: true, fixedY: true },
      { id: 3, x: 10, y: 5, forceX: 1000, forceY: 0 }
    ];
    const elements: TrussElement[] = [
      { id: 1, node1: 1, node2: 3, A: 1, E: 29000 },
      { id: 2, node1: 2, node2: 3, A: 1, E: 29000 }
    ];

    const result = solveTruss2DSystem(nodes, elements);

    // Validate we got results without throwing
    expect(result.displacements).toBeDefined();
    expect(result.displacements.length).toBe(6); // 2 DOFs per node (3 nodes)
    
    // Fixed nodes should have 0 disp
    expect(result.displacements[0]).toBeCloseTo(0, 5);
    expect(result.displacements[1]).toBeCloseTo(0, 5);
    expect(result.displacements[2]).toBeCloseTo(0, 5);
    expect(result.displacements[3]).toBeCloseTo(0, 5);
    
    expect(result.reactions[0]).toBeDefined();
    expect(result.internalForces[0]).toBeDefined();
  });
});
