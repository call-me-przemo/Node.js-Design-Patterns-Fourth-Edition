import { LoggingStrategy } from "./types";

export class HttpStrategy implements LoggingStrategy {
  constructor(private serverAddress: URL) {}

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
