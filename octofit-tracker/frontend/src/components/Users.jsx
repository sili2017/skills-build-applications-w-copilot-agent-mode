import { useEffect, useState } from 'react';
import { getApiEndpointUrl, getCollectionItems, getErrorMessage } from '../lib/apiBase';

function Users() {
  const [state, setState] = useState({ status: 'loading', items: [], error: '' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(getApiEndpointUrl('/users/'), { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to load users');
        }

        setState({ status: 'ready', items: getCollectionItems(payload), error: '' });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setState({
          status: 'error',
          items: [],
          error: getErrorMessage(error, 'Unable to load users')
        });
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);

  return <CollectionPage title="Users" endpoint="/api/users/" state={state} />;
}

function CollectionPage({ title, endpoint, state }) {
  return (
    <section className="glass-panel feature-page">
      <div className="eyebrow">API route</div>
      <h1>{title}</h1>
      <p className="mb-2">
        Data is requested from <code>{endpoint}</code> and the response is normalized whether the API returns
        an array directly or wraps it in a paginated payload.
      </p>

      {state.status === 'loading' ? <p>Loading {title.toLowerCase()}...</p> : null}
      {state.status === 'error' ? <p className="text-warning">{state.error}</p> : null}

      {state.status === 'ready' ? <CollectionList items={state.items} /> : null}
    </section>
  );
}

function CollectionList({ items }) {
  if (!items.length) {
    return <p>No items returned yet.</p>;
  }

  return (
    <div className="collection-grid">
      {items.map((item) => (
        <article className="collection-card" key={item._id || item.id || item.name || item.title}>
          <div className="feature-value">{item.points ?? 0} pts</div>
          <h2>{item.fullName || 'Unnamed user'}</h2>
          <dl className="collection-details">
            <div>
              <dt>Role</dt>
              <dd>{item.role || 'N/A'}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{item.teamName || 'N/A'}</dd>
            </div>
            <div>
              <dt>Weekly goal</dt>
              <dd>{item.weeklyGoalMinutes ? `${item.weeklyGoalMinutes} min` : 'N/A'}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{item.email || 'N/A'}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export default Users;