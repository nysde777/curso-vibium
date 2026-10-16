import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "vibium";

test("el formulario envía el texto 'Prueba CI'", async () => {
  const bro = await browser.start({ headless: !!process.env.CI });
  try {
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    await page.find('[name="my-text"]').fill("Prueba CI");
    await page.find({ role: "button", text: "Submit" }).click();
    await page.waitUntil.url("submitted-form.html");
    const url = await page.url();
    assert.ok(url.includes("my-text=Prueba+CI"), `URL inesperada: ${url}`);
  } finally {
    await bro.stop();
  }
});
