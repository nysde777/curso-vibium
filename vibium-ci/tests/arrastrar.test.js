import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "vibium";

test("arrastrar #draggable sobre #droppable muestra 'Dropped!'", async () => {
  const bro = await browser.start({ headless: !!process.env.CI });
  try {
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/droppableItems.html");
    const origen = await page.find("#draggable");
    const destino = await page.find("#droppable");
    await origen.dragTo(destino);
    const texto = await destino.text();
    assert.equal(texto.trim(), "Dropped!");
  } finally {
    await bro.stop();
  }
});
