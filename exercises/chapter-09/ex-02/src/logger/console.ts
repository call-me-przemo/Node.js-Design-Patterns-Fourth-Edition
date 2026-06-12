import { styleText } from "node:util";
import { LoggerTemplate } from "./template";

export class ConsoleLogger extends LoggerTemplate {
  public async log(msg: string) {
    console.log(msg);
  }

  public async debug(msg: string) {
    const styledMsg = styleText("gray", msg);
    console.debug(styledMsg);
  }

  public async info(msg: string) {
    const styledMsg = styleText("blue", msg);
    console.info(styledMsg);
  }

  public async warn(msg: string) {
    const styledMsg = styleText("yellow", msg);
    console.warn(styledMsg);
  }

  public async error(msg: string) {
    const styledMsg = styleText("red", msg);
    console.error(styledMsg);
  }
}
