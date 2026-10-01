import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createConfirmation, createForm, createLayout } from "./components";

const app = new Hono();

app.get("/", (c) => {
  const mail = c.req.query("mail");

  if (mail) {
    return c.html(createLayout(createConfirmation(mail)));
  }

  return c.html(createLayout(createForm()));
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
