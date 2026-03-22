import React, { useState } from 'react';
import type { Node, BarElement, SolverResult } from '../lib/fem/types';
import { solveBarSystem } from '../lib/fem/bar';
import ResultsDisplay from './ResultsDisplay';

const BarSolver: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, x: 0, y: 0, fixedX: true },
    { id: 2, x: 10, y: 0, forceX: 500 }
  ]);
  const [elements, setElements] = useState<BarElement[]>([
    { id: 1, node1: 1, node2: 2, A: 2, E: 200000, L: 10 }
  ]);
  
  const [result, setResult] = useState<SolverResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addNode = () => setNodes([...nodes, { id: nodes.length + 1, x: 0, y: 0 }]);
  const addElement = () => setElements([...elements, { id: elements.length + 1, node1: 1, node2: 2, A: 1, E: 200000, L: 10 }]);

  const updateNode = (index: number, field: keyof Node, value: any) => {
    const newNodes = [...nodes];
    newNodes[index] = { ...newNodes[index], [field]: value };
    setNodes(newNodes);
  };

  const updateElement = (index: number, field: keyof BarElement, value: any) => {
    const newEls = [...elements];
    newEls[index] = { ...newEls[index], [field]: value };
    setElements(newEls);
  };

  const handleSolve = () => {
    try {
      setError(null);
      const res = solveBarSystem(nodes, elements);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'An error occurred during solving.');
      setResult(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
        {/* Nodes Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="text-gradient">Nodes (1D)</h3>
            <button className="btn btn-outline" onClick={addNode} style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>+ Add Node</button>
          </div>
          
          <div className="table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Force X</th>
                  <th>Fixed X</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((n, i) => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td><input type="number" className="input-field" value={n.forceX || ''} onChange={e => updateNode(i, 'forceX', parseFloat(e.target.value) || undefined)} placeholder="0" /></td>
                    <td><input type="checkbox" checked={!!n.fixedX} onChange={e => updateNode(i, 'fixedX', e.target.checked)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Elements Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="text-gradient">Axial Bar Elements</h3>
            <button className="btn btn-outline" onClick={addElement} style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>+ Add Element</button>
          </div>

          <div className="table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>N1</th>
                  <th>N2</th>
                  <th>Area (A)</th>
                  <th>Modulus (E)</th>
                  <th>Length (L)</th>
                </tr>
              </thead>
              <tbody>
                {elements.map((el, i) => (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td><input type="number" className="input-field" style={{padding:'0.4rem', width:'3rem'}} value={el.node1} onChange={e => updateElement(i, 'node1', parseInt(e.target.value))} /></td>
                    <td><input type="number" className="input-field" style={{padding:'0.4rem', width:'3rem'}} value={el.node2} onChange={e => updateElement(i, 'node2', parseInt(e.target.value))} /></td>
                    <td><input type="number" className="input-field" style={{padding:'0.4rem'}} value={el.A} onChange={e => updateElement(i, 'A', parseFloat(e.target.value))} /></td>
                    <td><input type="number" className="input-field" style={{padding:'0.4rem'}} value={el.E} onChange={e => updateElement(i, 'E', parseFloat(e.target.value))} /></td>
                    <td><input type="number" className="input-field" style={{padding:'0.4rem'}} value={el.L || ''} onChange={e => updateElement(i, 'L', parseFloat(e.target.value))} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={handleSolve} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
          Solve System
        </button>
      </div>

      <ResultsDisplay nodes={nodes} elements={elements} domain="bar" result={result} error={error} />
    </div>
  );
};

export default BarSolver;
