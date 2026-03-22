import type { Node, TrussElement, SolverResult } from './types';
import { solveSystem, multiply } from './matrix';

export function solveTruss2DSystem(nodes: Node[], elements: TrussElement[]): SolverResult {
  const numNodes = nodes.length;
  const numDofs = numNodes * 2; // 2 DOFs per node (X and Y)

  const K = Array.from({ length: numDofs }, () => Array(numDofs).fill(0));
  const F = Array(numDofs).fill(0);

  // Pre-calculate L and Angle (theta) if coordinates are given
  for (const el of elements) {
    const n1 = nodes[el.node1 - 1];
    const n2 = nodes[el.node2 - 1];
    const dx = n2.x - n1.x;
    const dy = n2.y - n1.y;
    if (el.L === undefined) {
      el.L = Math.sqrt(dx * dx + dy * dy);
    }
    if (el.theta === undefined) {
      el.theta = Math.atan2(dy, dx);
    }
    if (el.L <= 0) throw new Error(`Truss Element ${el.id} has valid zero length.`);
  }

  for (const el of elements) {
    const i = (el.node1 - 1) * 2; // Node 1 X-DOF
    const j = (el.node2 - 1) * 2; // Node 2 X-DOF

    const c = Math.cos(el.theta!);
    const s = Math.sin(el.theta!);
    const c2 = c * c;
    const s2 = s * s;
    const cs = c * s;

    const k_val = (el.A * el.E) / el.L!;

    const k_local_global = [
      [c2, cs, -c2, -cs],
      [cs, s2, -cs, -s2],
      [-c2, -cs, c2, cs],
      [-cs, -s2, cs, s2]
    ];

    // Map 4x4 matrix into Global K
    const dofs = [i, i + 1, j, j + 1];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        K[dofs[row]][dofs[col]] += k_val * k_local_global[row][col];
      }
    }
  }

  const fixedDofs: number[] = [];
  for (let i = 0; i < numNodes; i++) {
    const node = nodes[i];
    const dofX = i * 2;
    const dofY = i * 2 + 1;

    if (node.forceX) F[dofX] = node.forceX;
    if (node.forceY) F[dofY] = node.forceY;

    if (node.fixedX) fixedDofs.push(dofX);
    if (node.fixedY) fixedDofs.push(dofY);
  }

  const u = solveSystem(K, F, fixedDofs);

  const R = Array(numDofs).fill(0);
  const K_u = multiply(K, u) as number[];
  for (let i = 0; i < numDofs; i++) {
    R[i] = K_u[i] - F[i];
    if (Math.abs(R[i]) < 1e-10) R[i] = 0;
  }

  // Calculate Stresses / Internal Axial Forces
  // f = (AE/L) * [-c, -s, c, s] * [u1x, u1y, u2x, u2y]^T
  const internalForces = elements.map(el => {
    const i = (el.node1 - 1) * 2;
    const j = (el.node2 - 1) * 2;
    
    const u_el = [u[i], u[i+1], u[j], u[j+1]];
    const c = Math.cos(el.theta!);
    const s = Math.sin(el.theta!);
    
    const T = [-c, -s, c, s];
    let sum = 0;
    for (let k = 0; k < 4; k++) {
      sum += T[k] * u_el[k];
    }
    
    return (el.A * el.E / el.L!) * sum;
  });

  return {
    displacements: u.map(val => Math.abs(val) < 1e-10 ? 0 : val),
    reactions: R,
    internalForces
  };
}
