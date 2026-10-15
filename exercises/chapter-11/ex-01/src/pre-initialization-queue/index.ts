import { Context } from "./context";

export function createPreInitializationQueue<T extends object>(
  target: T,
  methodNames: Array<string>,
  readyProp: string,
) {
  return new Proxy(target, new Context(methodNames, readyProp));
}
