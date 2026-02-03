import { ColorConsole } from "./base-console";

export class BlueConsole extends ColorConsole {
  public log(message: string) {
    console.log("\x1b[34m", message);
  }
}
