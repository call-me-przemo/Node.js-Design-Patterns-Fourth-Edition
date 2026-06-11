import { LoggingStrategy } from "./strategies";

export class Logger {
  constructor(private loggingStrategy: LoggingStrategy) {}

  public async log(msg: string) {
    await this.loggingStrategy.log(msg);
  }

  public async debug(msg: string) {
    await this.loggingStrategy.debug(msg);
  }

  public async info(msg: string) {
    await this.loggingStrategy.info(msg);
  }

  public async warn(msg: string) {
    await this.loggingStrategy.warn(msg);
  }

  public async error(msg: string) {
    await this.loggingStrategy.error(msg);
  }
}
