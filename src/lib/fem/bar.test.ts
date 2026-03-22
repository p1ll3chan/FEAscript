import { describe, it, expect } from 'vitest';
import { solveBarSystem } from './bar';
import type { Node, BarElement } from './types';

describe('Bar Element Solver', () => {
  it('solves a simple 1D axially loaded bar', () => {
    const nodes: Node[] = [
      { id: 1, x: 0, y: 0, fixedX: true },
      { id: 2, x: 10, y: 0, forceX: 500 } // Length = 10
    ];
    const elements: BarElement[] = [
      { id: 1, node1: 1, node2: 2, A: 2, E: 200000, L: 10 }
    ];
    // k = A*E/L = 2 * 200000 / 10 = 40000

    const result = solveBarSystem(nodes, elements);

    // Node 1 fixed
    expect(result.displacements[0]).toBeCloseTo(0, 5);
    
    // Node 2 u = F / k = 500 / 40000 = 0.0125
    expect(result.displacements[1]).toBeCloseTo(0.0125, 5);

    // Reaction at 1 = -500
    expect(result.reactions[0]).toBeCloseTo(-500, 5);
    
    // Internal force = k*(u2-u1) = 40000 * 0.0125 = 500
    expect(result.internalForces[0]).toBeCloseTo(500, 5);
  });
});
