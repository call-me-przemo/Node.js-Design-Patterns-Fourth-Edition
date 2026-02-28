export function createCachingFetch(originalFetch: FetchFunction) {
  const cache = new Map<Input, unknown>();

  return async (input: Input, init?: RequestInit) => {
    if (cache.has(input)) {
      return cache.get(input);
    }

    const res = await originalFetch(input, init);

    if (!res.ok) {
      throw new Error(res.status + " " + res.statusText);
    }

    const body = await res.json();

    cache.set(input, body);

    return res;
  };
}

type FetchFunction = (input: Input, init?: RequestInit) => Promise<Response>;
type Input = string | URL | Request;
