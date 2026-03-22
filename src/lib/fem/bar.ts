import type { Node, BarElement, SolverResult } from './types';
import { solveSystem, multiply } from './matrix';

export function solveBarSystem(nodes: Node[], elements: BarElement[]): SolverResult {
  const numNodes = nodes.length;
  const numDofs = numNodes; // 1 DOF per node (X direction)

  const K = Array.from({ length: numDofs }, () => Array(numDofs).fill(0));
  const F = Array(numDofs).fill(0);

  // Pre-calculate L if nodes have coordinates, or assume L is provided
  for (const el of elements) {
    const n1 = nodes[el.node1 - 1];
    const n2 = nodes[el.node2 - 1];
    if (el.L === undefined) {
      el.L = Math.abs(n2.x - n1.x); // Assuming 1D along X
    }
    if (el.L <= 0) throw new Error(`Bar Element ${el.id} has zero or negative length.`);
  }

  // Assemble Global K
  for (const el of elements) {
    const i = el.node1 - 1;
    const j = el.node2 - 1;
    const k = (el.A * el.E) / el.L!;

    K[i][i] += k;
    K[i][j] -= k;
    K[j][i] -= k;
    K[j][j] += k;
  }

  const fixedDofs: number[] = [];
  for (let i = 0; i < numNodes; i++) {
    const node = nodes[i];
    if (node.forceX) F[i] = node.forceX;
    if (node.fixedX) fixedDofs.push(i);
  }

  const u = solveSystem(K, F, fixedDofs);

  const R = Array(numDofs).fill(0);
  const K_u = multiply(K, u) as number[];
  for (let i = 0; i < numDofs; i++) {
    R[i] = K_u[i] - F[i];
    if (Math.abs(R[i]) < 1e-10) R[i] = 0;
  }

  const internalForces = elements.map(el => {
    const i = el.node1 - 1;
    const j = el.node2 - 1;
    const k = (el.A * el.E) / el.L!;
    return k * (u[j] - u[i]); 
    // Positive means tension, negative means compression
  });

  return {
    displacements: u.map(val => Math.abs(val) < 1e-10 ? 0 : val),
    reactions: R,
    internalForces
  };
}
