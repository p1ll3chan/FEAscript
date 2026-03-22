import type { SolverResult, Node, SpringElement, BarElement, TrussElement } from '../lib/fem/types';
import Visualizer3D from './Visualizer3D';

interface Props {
  nodes: Node[];
  elements: (SpringElement | BarElement | TrussElement)[];
  domain: 'spring' | 'bar' | 'truss';
  result: SolverResult | null;
  error: string | null;
}

const ResultsDisplay: React.FC<Props> = ({ nodes, elements, domain, result, error }) => {
  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem', borderLeft: '4px solid #ef4444' }}>
        <h3 className="text-gradient" style={{ color: '#ef4444' }}>Analysis Failed</h3>
        <p style={{ color: '#fca5a5' }}>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="animate-fade-in" style={{ marginTop: '2.5rem' }}>
      <h2 className="text-gradient">Analysis Results</h2>

      {/* 3D Interactive Visualization */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Interactive Deformation (Drag/Scroll)</h3>
        <Visualizer3D nodes={nodes} elements={elements} result={result} domain={domain} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Displacements Table */}
        <div className="glass-card">
          <h3>Nodal Displacements</h3>
          <div className="table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>DOF</th>
                  <th>Displacement (u)</th>
                </tr>
              </thead>
              <tbody>
                {result.displacements.map((u, i) => (
                  <tr key={i}>
                    <td>U{i + 1}</td>
                    <td style={{ color: Math.abs(u) > 1e-6 ? 'var(--accent-primary)' : 'inherit' }}>
                      {u.toExponential(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reaction Forces Table */}
        <div className="glass-card">
          <h3>Reaction Forces</h3>
          <div className="table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>DOF</th>
                  <th>Reaction (R)</th>
                </tr>
              </thead>
              <tbody>
                {result.reactions.map((r, i) => (
                  <tr key={i}>
                    <td>R{i + 1}</td>
                    <td style={{ color: Math.abs(r) > 1e-6 ? 'var(--accent-secondary)' : 'inherit' }}>
                      {Math.abs(r) < 1e-6 ? '0.0000' : r.toExponential(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Internal Element Forces Table */}
      <div className="glass-card">
        <h3>Element Internal Forces</h3>
        <div className="table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Element</th>
                <th>Internal Force</th>
              </tr>
            </thead>
            <tbody>
              {result.internalForces.map((f, i) => (
                <tr key={i}>
                  <td>El {i + 1}</td>
                  <td style={{ color: f > 1e-6 ? '#4ade80' : (f < -1e-6 ? '#f87171' : 'inherit') }}>
                    {f.toExponential(4)}
                    {f > 1e-6 && ' (T)'}
                    {f < -1e-6 && ' (C)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
