import { html } from "hono/html";

export function createForm() {
  return html`
    <form>
      <label>
        Email address:
        <input type="email" name="mail" required autofocus />
      </label>
      <input type="submit" value="Subscribe!" />
    </form>
  `;
}
