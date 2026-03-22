# FEAscript
An online FEA solver for beginners to understand how 1D and 2D elements are calculated in FEM.

FEAScript is an interactive, browser-based Finite Element Analysis (FEA) educational tool. It is designed to teach users the core concepts of structural engineering—Nodes, Elements, Boundary Conditions, and Forces—through real-time, interactive solvers. The project features a premium marketing frontend and highly functional, dark-themed calculation workspaces.

## Tech Stack
- **Frontend**: React (TypeScript), Vite
- **Styling**: Custom CSS with Glassmorphism
- **Math Engine**: mathjs (for matrix operations and system solving)
- **3D Visualization**: React Three Fiber / Drei (for 2D/3D visualizations)

---

## User Manual

### 1. 1D Spring Solver
The 1D Spring Solver allows you to analyze systems of interconnected linear springs. 

**How to Use:**
1. **Define Nodes**: Add nodes to define the connection points of your springs. Each node requires an `X` coordinate.
2. **Apply Boundary Conditions**: If a node is attached to a wall or ground, check the **Fix X** box. This sets its displacement to zero.
3. **Apply Loads**: Enter a force value in the `Fx` field for any node where a load is applied.
4. **Define Elements**: Connect your nodes by adding Spring Elements. Specify the start node (`Node 1`), end node (`Node 2`), and the spring stiffness constant (`k`).
5. **Solve**: Click the **Solve System** button. The application will calculate the nodal displacements, reaction forces at fixed supports, and the internal tension/compression forces in each spring.

---

### 2. 1D Axial Bar Solver
The 1D Axial Bar Solver is used for studying axially loaded bars with varying cross-sections.

**How to Use:**
1. **Define Nodes**: Similar to springs, define nodes along the X-axis where the bar changes cross-section, material, or where loads/supports act.
2. **Apply Boundary Conditions**: Check **Fix X** for nodes anchored to a rigid support.
3. **Apply Loads**: Apply axial forces (`Fx`) at specific nodes.
4. **Define Elements**: Represent sections of the bar as elements connecting two nodes. For each element, you must provide:
   - `A`: Cross-sectional Area
   - `E`: Young's Modulus (Elastic Modulus) of the material
5. **Solve**: Click **Solve System** to calculate displacements, reactions, and the internal axial forces.

---

### 3. 2D Truss Analysis
The 2D Truss Solver lets you design and analyze complex two-dimensional truss structures (e.g., bridges, roof frames).

**How to Use:**
1. **Define Nodes (2D)**: Add nodes with both `X` and `Y` coordinates to form the geometry of your truss.
2. **Boundary Conditions**: You can restrict movement in either the X-direction (`Fix X`), Y-direction (`Fix Y`), or both (a pinned support). A roller support would only have one axis fixed.
3. **Apply Loads**: Apply horizontal (`Fx`) and vertical (`Fy`) forces to any node.
4. **Define Elements**: Add truss members by connecting nodes. Specify:
   - `A`: Cross-sectional Area
   - `E`: Young's Modulus
   *(The length and angle of each member are calculated automatically based on the node coordinates).*
5. **Solve & Visualize**: Click **Solve System**. 
   - A data table will display the exact X/Y displacements, reaction forces, and internal forces.
   - An interactive **3D/2D Canvas** will render below the table, showing the original structure (ghosted) and the deformed structure (solid). Tension members are highlighted in green, and compression members in red.

---

## Local Development
To run this project locally:

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173/` to view the application in your browser.
