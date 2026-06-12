import { LoggerTemplate } from "./template";

export class HttpLogger extends LoggerTemplate {
  constructor(private serverAddress: URL) {
    super();
  }

  public async log(msg: string) {
    const body = JSON.stringify({
      level: "LOG",
      msg,
    });

    await fetch(this.serverAddress, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async debug(msg: string) {
    const body = JSON.stringify({
      level: "DEBUG",
      msg,
    });

    await fetch(this.serverAddress, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async info(msg: string) {
    const body = JSON.stringify({
      level: "INFO",
      msg,
    });

    await fetch(this.serverAddress, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async warn(msg: string) {
    const body = JSON.stringify({
      level: "WARN",
      msg,
    });

    await fetch(this.serverAddress, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async error(msg: string) {
    const body = JSON.stringify({
      level: "ERROR",
      msg,
    });

    await fetch(this.serverAddress, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }
}
