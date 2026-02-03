import { ColorConsole } from "./base-console";

export class RedConsole extends ColorConsole {
  public log(message: string) {
    console.log("\x1b[31m", message);
  }
}
