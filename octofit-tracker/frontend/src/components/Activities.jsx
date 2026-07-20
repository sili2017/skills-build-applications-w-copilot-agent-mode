import { useEffect, useState } from 'react';
import { getApiEndpointUrl, getCollectionItems, getErrorMessage } from '../lib/apiBase';

function Activities() {
  const [state, setState] = useState({ status: 'loading', items: [], error: '' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(getApiEndpointUrl('/activities/'), { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to load activities');
        }

        setState({ status: 'ready', items: getCollectionItems(payload), error: '' });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setState({
          status: 'error',
          items: [],
          error: getErrorMessage(error, 'Unable to load activities')
        });
      }
    }

    loadActivities();

    return () => controller.abort();
  }, []);

  return <CollectionPage title="Activities" endpoint="/api/activities/" state={state} />;
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
          <div className="feature-value">{item.activityType || 'Activity'}</div>
          <h2>{item.userName || 'Unknown athlete'}</h2>
          <dl className="collection-details">
            <div>
              <dt>Duration</dt>
              <dd>{item.durationMinutes ? `${item.durationMinutes} min` : 'N/A'}</dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{typeof item.distanceKm === 'number' ? `${item.distanceKm} km` : 'N/A'}</dd>
            </div>
            <div>
              <dt>Calories</dt>
              <dd>{item.caloriesBurned ? `${item.caloriesBurned} kcal` : 'N/A'}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{formatPerformedAt(item.performedAt)}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function formatPerformedAt(performedAt) {
  if (!performedAt) {
    return 'N/A';
  }

  const date = new Date(performedAt);

  if (Number.isNaN(date.getTime())) {
    return 'N/A';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

export default Activities;