import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "vibium";

test("el título de la página es 'Web form'", async () => {
  const bro = await browser.start({ headless: !!process.env.CI });
  try {
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    const titulo = await page.title();
    assert.equal(titulo, "Web form");
  } finally {
    await bro.stop();
  }
});
