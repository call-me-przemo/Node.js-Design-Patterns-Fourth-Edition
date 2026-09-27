import { equal } from "node:assert/strict";
import { suite, test } from "node:test";
import { slugify } from "./slugify";

suite("Slugify function", { concurrency: true }, () => {
  test("Converts simple phrase", () => {
    equal(slugify("Hello World!"), "hello-world");
  });

  test("Converts complex phrase", () => {
    equal(
      slugify("   Node.js----design - - Patterns!!"),
      "nodejs-design-patterns",
    );
  });
});
