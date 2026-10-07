export function callIfNotAborted(abortSignal, func, ...args) {
  abortSignal.throwIfAborted();

  return func(args);
}
