import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { getApiBaseUrl } from './lib/apiBase';

const dashboardCards = [
  {
    title: 'Activity logging',
    value: 'Fast entry',
    description: 'Capture workouts, distances, and training time with minimal friction.'
  },
  {
    title: 'Team challenges',
    value: 'Friendly competition',
    description: 'Build squads, compare points, and keep motivation high all semester.'
  },
  {
    title: 'Workout guidance',
    value: 'Personalized plans',
    description: 'Surface suggestions based on recent activity and current fitness goals.'
  }
];

const quickFacts = [
  'Frontend on 5173',
  'Backend API on 8000',
  'MongoDB on 27017'
];

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar container py-3">
        <Link className="brand" to="/">
          <img className="brand-logo" src="/octofitapp-small.png" alt="OctoFit Tracker logo" />
          <span>
            <strong>OctoFit Tracker</strong>
            <small>Modern fitness tracking for students</small>
          </span>
        </Link>

        <nav className="nav-pills-wrap">
          <NavLink className="nav-pill" to="/">
            Overview
          </NavLink>
          <NavLink className="nav-pill" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-pill" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-pill" to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main className="container pb-5">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage apiBaseUrl={apiBaseUrl} />
            }
          />
          <Route path="/activities" element={<FeaturePage title="Activities" />} />
          <Route path="/teams" element={<FeaturePage title="Teams" />} />
          <Route path="/workouts" element={<FeaturePage title="Workouts" />} />
        </Routes>
      </main>
    </div>
  );
}

function HomePage({ apiBaseUrl }) {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy glass-panel">
          <div className="eyebrow">OctoFit Tracker starter</div>
          <h1>Launch a polished fitness platform with a clean frontend and an API-ready backend.</h1>
          <p>
            Students can log workouts, join teams, and stay engaged with a friendly leaderboard while the
            platform stays simple for teachers to run.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/activities">
              Explore features
            </Link>
            <a className="btn btn-outline-light btn-lg" href={apiBaseUrl} target="_blank" rel="noreferrer">
              API base URL
            </a>
          </div>

          <div className="fact-row">
            {quickFacts.map((fact) => (
              <span key={fact} className="fact-chip">
                {fact}
              </span>
            ))}
          </div>
        </div>

        <aside className="glass-panel summary-panel">
          <div className="summary-label">Initial stack</div>
          <ul className="summary-list">
            <li>React 19 + Vite frontend</li>
            <li>Express + TypeScript backend</li>
            <li>Mongoose-powered MongoDB access</li>
            <li>Ports reserved for 5173, 8000, and 27017</li>
          </ul>
        </aside>
      </section>

      <section className="cards-grid mt-4">
        {dashboardCards.map((card) => (
          <article className="glass-panel feature-card" key={card.title}>
            <div className="feature-value">{card.value}</div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function FeaturePage({ title }) {
  return (
    <section className="glass-panel feature-page">
      <div className="eyebrow">Section scaffold</div>
      <h1>{title}</h1>
      <p>
        This route is ready for the next build step: connecting the UI to the backend API and layering in
        route-specific content.
      </p>
    </section>
  );
}

export default App;