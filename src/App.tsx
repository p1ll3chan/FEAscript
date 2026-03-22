import { useState } from 'react';
import SpringSolver from './components/SpringSolver';
import BarSolver from './components/BarSolver';
import TrussSolver from './components/TrussSolver';
import FrontPage from './components/FrontPage';

type Domain = 'home' | 'spring' | 'bar' | 'truss';

function App() {
  const [activeDomain, setActiveDomain] = useState<Domain>('home');

  if (activeDomain === 'home') {
    return <FrontPage onStart={setActiveDomain} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar glass-panel" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRight: '1px solid var(--panel-border)' }}>
        <h2 className="text-gradient" style={{ cursor: 'pointer' }} onClick={() => setActiveDomain('home')}>FEAScript</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Interactive analysis tool
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            className={`btn ${activeDomain === 'spring' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveDomain('spring')}
          >
            Spring Element (1D)
          </button>
          <button
            className={`btn ${activeDomain === 'bar' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveDomain('bar')}
          >
            Bar Element (1D)
          </button>
          <button
            className={`btn ${activeDomain === 'truss' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveDomain('truss')}
          >
            Truss Analysis (2D)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header style={{ marginBottom: '2rem' }}>
          <h1 className="text-gradient animate-fade-in">
            {activeDomain === 'spring' && '1D Spring Analysis'}
            {activeDomain === 'bar' && '1D Axial Bar Analysis'}
            {activeDomain === 'truss' && '2D Truss Analysis'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Define nodes, elements, and boundary conditions to solve the system.
          </p>
        </header>

        <section className="glass-panel" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
          {activeDomain === 'spring' && <SpringSolver />}
          {activeDomain === 'bar' && <BarSolver />}
          {activeDomain === 'truss' && <TrussSolver />}
        </section>
      </main>
    </div>
  );
}

export default App;
