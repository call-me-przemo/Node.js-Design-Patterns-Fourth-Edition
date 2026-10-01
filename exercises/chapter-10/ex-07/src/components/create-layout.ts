import { html } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";

export function createLayout(
  page: HtmlEscapedString | Promise<HtmlEscapedString>,
) {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>The spammers heaven</title>
      </head>
      <body>
        <h1>The spammers heaven</h1>
        <div>${page}</div>
      </body>
    </html> `;
}
