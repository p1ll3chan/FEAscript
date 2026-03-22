export interface Node {
  id: number;
  x: number;
  y: number; // For 2D Truss
  forceX?: number;
  forceY?: number;
  fixedX?: boolean;
  fixedY?: boolean;
}

export interface SpringElement {
  id: number;
  node1: number;
  node2: number;
  k: number; // Stiffness
}

export interface BarElement {
  id: number;
  node1: number;
  node2: number;
  A: number; // Cross-sectional area
  E: number; // Young's modulus
  L?: number; // Calculated length
}

export interface TrussElement {
  id: number;
  node1: number;
  node2: number;
  A: number;
  E: number;
  L?: number;
  theta?: number; // Angle in radians
}

export interface SolverResult {
  displacements: number[];
  reactions: number[];
  internalForces: number[];
}
