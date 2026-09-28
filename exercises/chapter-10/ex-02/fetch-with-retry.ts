export async function fetchWithRetry(
  asyncFn: (...args: unknown[]) => Promise<unknown>,
  maxRetries: number,
) {
  while (maxRetries--) {
    try {
      return await asyncFn();
    } catch (err) {
      if (!maxRetries) {
        throw err;
      }
    }
  }
}
