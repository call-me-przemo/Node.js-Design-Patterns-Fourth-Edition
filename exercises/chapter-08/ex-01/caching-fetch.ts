export function createCachingFetch() {
  const cache = new Map<FetchInput, string>();

  return new Proxy(fetch, {
    async apply(target, _this, args: [FetchInput, RequestInit?]) {
      if (cache.has(args[0])) {
        return cache.get(args[0]);
      }

      const res = await target(...args);

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const data = await res.text();

      cache.set(args[0], data);

      return data;
    },
  });
}

type FetchInput = URL | RequestInfo;
