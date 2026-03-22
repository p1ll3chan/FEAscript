import { describe, it, expect } from 'vitest';
import { solveSpringSystem } from './spring';
import type { Node, SpringElement } from './types';

describe('Spring Element Solver', () => {
  it('solves a simple 2-node spring system correctly', () => {
    const nodes: Node[] = [
      { id: 1, x: 0, y: 0, fixedX: true },
      { id: 2, x: 10, y: 0, forceX: 100 }
    ];
    const elements: SpringElement[] = [
      { id: 1, node1: 1, node2: 2, k: 50 }
    ];

    const result = solveSpringSystem(nodes, elements);

    // Node 1 fixed, so u1 = 0
    expect(result.displacements[0]).toBeCloseTo(0, 5);
    // Node 2 force 100, k = 50 -> u2 = F/k = 2
    expect(result.displacements[1]).toBeCloseTo(2, 5);

    // Reaction at Node 1 should be -100
    expect(result.reactions[0]).toBeCloseTo(-100, 5);
    // Internal force in element 1 should be 100 (Tension)
    expect(result.internalForces[0]).toBeCloseTo(100, 5);
  });
});
