import { StateInterface } from "./types";

export class QueuingState<T extends object> implements StateInterface<T> {
  private readonly commandsQueue = new Array();

  public exec(target: T, method: Function, args: unknown[]) {
    return new Promise((res, rej) => {
      const command = () => {
        method.apply(target, args).then(res, rej);
      };

      this.commandsQueue.push(command);
    });
  }

  public deactivate() {
    while (this.commandsQueue.length > 0) {
      const command = this.commandsQueue.shift();
      command();
    }
  }
}
