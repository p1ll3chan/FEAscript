import * as math from 'mathjs';

/**
 * Solves Ku = F after applying boundary conditions using the Penalty Method.
 * @param K Global stiffness matrix
 * @param F Global force vector
 * @param fixedDofs Array of indices (0-based) that are fixed
 * @param penalty Value to add to diagonal for fixed DOFs (default 1e20)
 */
export function solveSystem(K: number[][], F: number[], fixedDofs: number[], penalty: number = 1e20): number[] {
  const K_mod = math.clone(K) as number[][];
  const F_mod = [...F];

  // Apply Penalty Method
  for (const dof of fixedDofs) {
    K_mod[dof][dof] += penalty;
    // For a fixed displacement of 0, F_mod doesn't change
  }

  // Solve the system: u = K_mod^-1 * F_mod
  try {
    const K_inv = math.inv(K_mod);
    const u = math.multiply(K_inv, F_mod) as number[];
    return u;
  } catch (error) {
    console.error("Matrix Inversion Error (Likely Singular):", error);
    throw new Error("System is unstable or lacks sufficient boundary conditions.");
  }
}

/**
 * Basic matrix addition
 */
export function add(a: number[][], b: number[][]): number[][] {
  return math.add(a, b) as number[][];
}

/**
 * Basic matrix multiplication
 */
export function multiply(a: number[][] | number[], b: number[][] | number[]): any {
  return math.multiply(a, b);
}

/**
 * Transpose a matrix
 */
export function transpose(a: number[][]): number[][] {
  return math.transpose(a) as number[][];
}
