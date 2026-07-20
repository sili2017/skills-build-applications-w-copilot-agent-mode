import { useEffect, useState } from 'react';
import { getApiEndpointUrl, getCollectionItems } from '../lib/apiBase';

function Leaderboard() {
  const [state, setState] = useState({ status: 'loading', items: [], error: '' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiEndpointUrl('/leaderboard/'), { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to load leaderboard');
        }

        setState({ status: 'ready', items: getCollectionItems(payload), error: '' });
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setState({ status: 'error', items: [], error: error.message });
      }
    }

    loadLeaderboard();

    return () => controller.abort();
  }, []);

  return <CollectionPage title="Leaderboard" endpoint="/api/leaderboard/" state={state} />;
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
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </article>
      ))}
    </div>
  );
}

export default Leaderboard;