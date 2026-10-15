import { InitializedState } from "./initialized-state";
import { QueuingState } from "./queuing-state";

export class Context<T extends object> implements ProxyHandler<T> {
  private state: QueuingState<T> | InitializedState<T>;

  constructor(
    private readonly methodNames: Array<string>,
    private readonly readyProp: string,
  ) {
    this.state = new QueuingState();
  }

  public get(target: T, property: string) {
    const method = target[property as keyof T];

    if (typeof method === "function" && this.methodNames.includes(property)) {
      return (...args: unknown[]) => {
        return this.state.exec(target, method, args);
      };
    }

    return Reflect.get(target, property);
  }

  public set(target: T, property: string, value: unknown) {
    if (
      property === this.readyProp &&
      value === true &&
      this.state instanceof QueuingState
    ) {
      this.state.deactivate();
      this.state = new InitializedState();
    }

    Reflect.set(target, property, value);

    return true;
  }
}
