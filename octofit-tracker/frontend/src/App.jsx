import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './lib/apiBase';

const dashboardCards = [
  {
    title: 'Activities',
    description: 'Recent workouts and movement logs pulled from the API.'
  },
  {
    title: 'Leaderboard',
    description: 'Individual and team rankings with automatic response-shape handling.'
  },
  {
    title: 'Teams',
    description: 'Team rosters and point totals for the semester challenge.'
  },
  {
    title: 'Users',
    description: 'Student and teacher records returned from MongoDB.'
  },
  {
    title: 'Workouts',
    description: 'Suggested sessions with fallback support for paginated APIs.'
  }
];

const quickFacts = ['Frontend on 5173', 'Backend API on 8000', 'MongoDB on 27017'];

const componentRoutes = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' }
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
          {componentRoutes.map((route) => (
            <NavLink key={route.path} className="nav-pill" to={route.path}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="container pb-5">
        <Routes>
          <Route path="/" element={<HomePage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<NotFoundPage />} />
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
              Explore activities
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
            <li>Define VITE_CODESPACE_NAME in .env.local for Codespaces</li>
          </ul>
        </aside>
      </section>

      <section className="cards-grid mt-4">
        {dashboardCards.map((card) => (
          <article className="glass-panel feature-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="glass-panel feature-page">
      <div className="eyebrow">Route missing</div>
      <h1>Page not found</h1>
      <p>
        The requested route does not exist yet. Use the navigation above to return to the overview or one of
        the data sections.
      </p>
    </section>
  );
}

export default App;