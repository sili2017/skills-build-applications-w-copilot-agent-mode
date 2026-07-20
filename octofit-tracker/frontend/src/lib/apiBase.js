const FALLBACK_API_BASE_URL = 'http://localhost:8000';

// VITE_CODESPACE_NAME should be defined in .env.local when running in Codespaces.
// When it is missing, the app tries to derive the backend host from the current frontend URL.
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (!codespaceName) {
    if (typeof window !== 'undefined') {
      const { hostname } = window.location;

      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
        return FALLBACK_API_BASE_URL;
      }

      const codespacesHostMatch = hostname.match(/^(.+)-5173\.app\.github\.dev$/);

      if (codespacesHostMatch) {
        return `https://${codespacesHostMatch[1]}-8000.app.github.dev`;
      }
    }

    return FALLBACK_API_BASE_URL;
  }

  return `https://${codespaceName}-8000.app.github.dev`;
}

export function getApiEndpointUrl(componentPath) {
  const normalizedPath = componentPath.startsWith('/') ? componentPath : `/${componentPath}`;

  return `${getApiBaseUrl()}/api${normalizedPath}`;
}

export function getCollectionItems(responseBody) {
  if (Array.isArray(responseBody)) {
    return responseBody;
  }

  if (!responseBody || typeof responseBody !== 'object') {
    return [];
  }

  if (Array.isArray(responseBody.items)) {
    return responseBody.items;
  }

  if (Array.isArray(responseBody.results)) {
    return responseBody.results;
  }

  if (Array.isArray(responseBody.data)) {
    return responseBody.data;
  }

  if (responseBody.data && typeof responseBody.data === 'object') {
    if (Array.isArray(responseBody.data.items)) {
      return responseBody.data.items;
    }

    if (Array.isArray(responseBody.data.results)) {
      return responseBody.data.results;
    }
  }

  return [];
}

export function getErrorMessage(error, fallbackMessage) {
  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  return fallbackMessage;
}