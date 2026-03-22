import type { Node, SpringElement, SolverResult } from './types';
import { solveSystem, multiply } from './matrix';

export function solveSpringSystem(nodes: Node[], elements: SpringElement[]): SolverResult {
  const numNodes = nodes.length;
  const numDofs = numNodes; // 1 DOF per node (X direction)

  // Initialize Global Stiffness Matrix K (numDofs x numDofs)
  const K = Array.from({ length: numDofs }, () => Array(numDofs).fill(0));
  // Initialize Global Force Vector F
  const F = Array(numDofs).fill(0);

  // Assemble Elements
  for (const el of elements) {
    const i = el.node1 - 1; // 0-based index
    const j = el.node2 - 1;
    const k = el.k;

    // Local stiffness matrix
    // k_local = [ k, -k ]
    //           [-k,  k ]
    K[i][i] += k;
    K[i][j] -= k;
    K[j][i] -= k;
    K[j][j] += k;
  }

  const fixedDofs: number[] = [];

  // Assemble Forces and Boundary Conditions
  for (let i = 0; i < numNodes; i++) {
    const node = nodes[i];
    if (node.forceX) {
      F[i] = node.forceX;
    }
    if (node.fixedX) {
      fixedDofs.push(i);
    }
  }

  // Solve for Displacements u
  const u = solveSystem(K, F, fixedDofs);

  // Calculate Reactions (R = K_original * u - F_applied)
  // We need the original K and original Applied F to find reactions
  const R = Array(numDofs).fill(0);
  const K_u = multiply(K, u) as number[];
  for (let i = 0; i < numDofs; i++) {
    R[i] = K_u[i] - F[i];
    // Clean up small numerical noise
    if (Math.abs(R[i]) < 1e-10) R[i] = 0;
  }

  // Calculate Internal Forces for each element (f = k * (u2 - u1))
  const internalForces = elements.map(el => {
    const i = el.node1 - 1;
    const j = el.node2 - 1;
    return el.k * (u[j] - u[i]);
  });

  return {
    displacements: u.map(val => Math.abs(val) < 1e-10 ? 0 : val),
    reactions: R,
    internalForces
  };
}
