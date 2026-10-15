import { StateInterface } from "./types";

export class InitializedState<T extends object> implements StateInterface<T> {
  public exec(target: T, method: Function, args: unknown[]) {
    return method.apply(target, args);
  }
}
