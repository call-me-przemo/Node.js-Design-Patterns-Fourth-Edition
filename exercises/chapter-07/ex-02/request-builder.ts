import { IncomingMessage, request } from "node:http";

export class RequestBuilder {
  private method = HttpMethod.GET;
  private url = new URL("http://localhost");
  private headers = {};
  private body: unknown = null;

  public setMethod(method: HttpMethod) {
    this.method = method;
    return this;
  }

  public setUrl(url: string | URL) {
    this.url = new URL(url);
    return this;
  }

  public setPort(port: string) {
    this.url.port = port;
    return this;
  }

  public setSearchParams(params: Record<string, string>) {
    for (const param in params) {
      this.url.searchParams.set(param, params[param]);
    }
    return this;
  }

  public setHeaders(headers: Record<string, string>) {
    this.headers = headers;
    return this;
  }

  public setBody(body: unknown) {
    this.body = body;
    return this;
  }

  // biome-ignore lint/suspicious/noThenProperty: make object thenable
  public then(
    onFulfilled: (res: IncomingMessage) => void,
    onRejected: (err: Error) => void,
  ) {
    request(
      this.url,
      { headers: this.headers, method: this.method },
      onFulfilled,
    )
      .on("error", onRejected)
      .end(this.body);
  }
}

export enum HttpMethod {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PATCH = "PATCH",
}
