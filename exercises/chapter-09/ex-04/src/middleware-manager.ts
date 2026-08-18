export class LoggerMiddlewareManager {
  private middlewares = new Array<MiddlewareFunction>();

  public use(middleware: MiddlewareFunction) {
    this.middlewares.push(middleware);
  }

  public async log(initialMessage: unknown) {
    let message = initialMessage;
    for (const middleware of this.middlewares) {
      message = await middleware(message);
    }
  }
}

export type MiddlewareFunction = (
  message: unknown,
) => Promise<unknown> | unknown;
