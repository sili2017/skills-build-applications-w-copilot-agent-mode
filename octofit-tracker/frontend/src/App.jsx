import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl, getApiEndpointUrl, getCollectionItems } from './lib/apiBase';

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

      <LiveSnapshot />

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

function LiveSnapshot() {
  const resources = [
    { title: 'Activities', endpoint: '/activities/' },
    { title: 'Leaderboard', endpoint: '/leaderboard/' },
    { title: 'Teams', endpoint: '/teams/' },
    { title: 'Users', endpoint: '/users/' },
    { title: 'Workouts', endpoint: '/workouts/' }
  ];
  const [state, setState] = useState({ status: 'loading', items: [] });

  useEffect(() => {
    const controller = new AbortController();

    async function loadSnapshot() {
      try {
        const entries = await Promise.all(
          resources.map(async (resource) => {
            const response = await fetch(getApiEndpointUrl(resource.endpoint), { signal: controller.signal });
            const payload = await response.json();

            return {
              ...resource,
              count: response.ok ? getCollectionItems(payload).length : 0,
              sample: response.ok ? getCollectionItems(payload)[0] : null
            };
          })
        );

        setState({ status: 'ready', items: entries });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setState({ status: 'error', items: [] });
      }
    }

    loadSnapshot();

    return () => controller.abort();
  }, []);

  return (
    <section className="mt-4">
      <div className="summary-label">Live data snapshot</div>
      {state.status === 'loading' ? <p className="text-muted">Loading dashboard data...</p> : null}
      {state.status === 'error' ? (
        <div className="glass-panel feature-card mt-3">
          <h2>Unable to load live data</h2>
          <p>Check that the backend is running on port 8000 and seeded with OctoFit records.</p>
        </div>
      ) : null}

      {state.status === 'ready' ? (
        <section className="cards-grid mt-3">
          {state.items.map((resource) => (
            <article className="glass-panel feature-card" key={resource.title}>
              <div className="feature-value">{resource.count} records</div>
              <h2>{resource.title}</h2>
              <p>{describeSample(resource.sample)}</p>
            </article>
          ))}
        </section>
      ) : null}
    </section>
  );
}

function describeSample(sample) {
  if (!sample || typeof sample !== 'object') {
    return 'No preview available yet.';
  }

  return sample.fullName || sample.name || sample.title || sample.activityType || 'Preview available from the API.';
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