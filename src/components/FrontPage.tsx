interface FrontPageProps {
  onStart: (domain: 'spring' | 'bar' | 'truss') => void;
}

export default function FrontPage({ onStart }: FrontPageProps) {
  return (
    <div className="front-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title animate-fade-in">FEAScript</h1>
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Discover the power of Finite Element Analysis directly in your browser. Seamless, interactive, and beautiful engineering tools.
        </p>
        <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <button className="btn btn-primary hero-btn" onClick={() => onStart('spring')}>
            Launch FEAScript <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* Manual Section */}
      <section className="manual-section" style={{ animationDelay: '0.5s', animationFillMode: 'both', animationName: 'fadeIn', animationDuration: '0.8s' }}>
        <h2 className="section-title text-gradient">FEA for Beginners</h2>
        <p className="section-subtitle">A simple guide to understanding how structural analysis works</p>
        
        <div className="feature-grid">
          <a href="https://www.simscale.com/blog/fea-for-beginners/" target="_blank" rel="noopener noreferrer" className="manual-card glass-panel animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both', textDecoration: 'none', color: 'inherit' }}>
            <div className="card-icon">🧠</div>
            <h3>What is FEA?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Finite Element Analysis is a mathematical method for predicting how a part or assembly reacts to real-world forces. 
              It breaks down a complex structure into smaller, simpler pieces called <strong>elements</strong>.
            </p>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--accent-primary)' }}>Learn More &rarr;</span>
          </a>

          <a href="https://enterfea.com/what-are-nodes-and-elements-in-finite-element-analysis/" target="_blank" rel="noopener noreferrer" className="manual-card glass-panel animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both', textDecoration: 'none', color: 'inherit' }}>
            <div className="card-icon">🔵</div>
            <h3>Nodes & Elements</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Nodes</strong> are the connection points in a structure (like joints in a bridge frame). <br/>
              <strong>Elements</strong> are the lines or shapes connecting the nodes (like the beams connecting joints).
            </p>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--accent-primary)' }}>Learn More &rarr;</span>
          </a>

          <a href="https://enterfea.com/what-are-different-boundary-conditions-in-fea/" target="_blank" rel="noopener noreferrer" className="manual-card glass-panel animate-fade-in" style={{ animationDelay: '1.0s', animationFillMode: 'both', textDecoration: 'none', color: 'inherit' }}>
            <div className="card-icon">⚓</div>
            <h3>Boundary Conditions</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              To solve a system, we need to know how it is anchored to the ground. Boundary conditions tell us which nodes are <strong>fixed in place</strong> or allowed to slide.
            </p>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--accent-primary)' }}>Learn More &rarr;</span>
          </a>

          <a href="https://sdcverifier.com/structural-engineering-101/fea-loads-body-forces-vs-pressures-vs-accelerations/" target="_blank" rel="noopener noreferrer" className="manual-card glass-panel animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both', textDecoration: 'none', color: 'inherit' }}>
            <div className="card-icon">⬇️</div>
            <h3>Loads & Forces</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We apply <strong>forces</strong> to the nodes to see how the structure bends or stretches under pressure. The solver calculates the exact displacements.
            </p>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--accent-primary)' }}>Learn More &rarr;</span>
          </a>

          <a href="https://github.com/p1ll3chan/FEAscript/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="manual-card glass-panel animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'both', textDecoration: 'none', color: 'inherit' }}>
            <div className="card-icon">📖</div>
            <h3>User Manual</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Read the complete documentation on how to use the interactive solvers, define nodes, assign boundary conditions, and apply loads.
            </p>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--accent-primary)' }}>Read Manual &rarr;</span>
          </a>
        </div>
      </section>

      {/* Solvers Showcase */}
      <section className="solvers-section" style={{ animationDelay: '1.4s', animationFillMode: 'both', animationName: 'fadeIn', animationDuration: '0.8s' }}>
        <h2 className="section-title text-gradient">Interactive Solvers</h2>
        <div className="feature-grid">
          <div className="solver-card glass-card" onClick={() => onStart('spring')}>
            <h3>1D Spring</h3>
            <p>Analyze systems of interconnected linear springs.</p>
          </div>
          <div className="solver-card glass-card" onClick={() => onStart('bar')}>
            <h3>1D Axial Bar</h3>
            <p>Study axially loaded bars with varying cross-sections.</p>
          </div>
          <div className="solver-card glass-card" onClick={() => onStart('truss')}>
            <h3>2D Truss</h3>
            <p>Design complex two-dimensional truss structures in real-time.</p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="profile-section" style={{ animationDelay: '1.6s', animationFillMode: 'both', animationName: 'fadeIn', animationDuration: '0.8s' }}>
        <div className="profile-card glass-panel">
          <div className="profile-info">
            <h3 className="profile-name text-gradient">ABHIJITH R PILLAI</h3>
            <p className="profile-detail">Roll No: <strong>AM.EN.U4MEE23002</strong></p>
            <p className="profile-detail">Institution: <strong>Amrita Vishwa Vidyapeetham, Amritapuri Campus</strong></p>
          </div>
          <div className="profile-links">
            <a href="https://github.com/p1ll3chan/FEAscript" target="_blank" rel="noopener noreferrer" className="btn btn-outline profile-btn" style={{ gap: '0.5rem' }}>
              <span className="icon" style={{ display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span> GitHub Project
            </a>
            <a href="https://www.linkedin.com/in/abhijith-r-pillai/" target="_blank" rel="noopener noreferrer" className="btn btn-primary profile-btn" style={{ gap: '0.5rem', background: 'linear-gradient(135deg, #0a66c2, #0077b5)' }}>
              <span className="icon" style={{ display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12C24 5.373 18.627 0 12 0zM8.139 17.848H5.632v-8.15h2.507v8.15zM6.885 8.583a1.455 1.455 0 110-2.91 1.455 1.455 0 010 2.91zm11.488 9.265h-2.508v-3.952c0-.943-.018-2.155-1.314-2.155-1.314 0-1.516 1.026-1.516 2.086v4.021h-2.507v-8.15h2.408v1.114h.034c.335-.635 1.155-1.305 2.378-1.305 2.541 0 3.012 1.672 3.012 3.845v4.545h.013z"/>
                </svg>
              </span> LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
