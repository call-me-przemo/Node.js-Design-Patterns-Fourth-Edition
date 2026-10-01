import { expect, test } from "@playwright/test";

test("The spammers heaven app", async ({ page }) => {
  const mail = "test@example.com";

  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox", { name: "mail" }).fill(mail);
  await page.getByRole("button", { name: "Subscribe!" }).click();

  await expect(page.getByText("Thanks for subscribing")).toContainText(mail);
});
