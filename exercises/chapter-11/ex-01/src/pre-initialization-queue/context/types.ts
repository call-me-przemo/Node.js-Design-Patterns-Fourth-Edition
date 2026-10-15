export interface StateInterface<T> {
  exec(target: T, method: Function, args: unknown[]): Promise<unknown>;
  deactivate?(): void;
}
