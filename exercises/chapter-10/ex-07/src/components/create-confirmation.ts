import { html } from "hono/html";

export function createConfirmation(mail: string) {
  return html` <p>Thanks for subscribing, ${mail}</p> `;
}
