import { ColorConsole } from "./base-console";

export class GreenConsole extends ColorConsole {
  public log(message: string) {
    console.log("\x1b[32m", message);
  }
}
