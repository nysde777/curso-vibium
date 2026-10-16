import { browser } from "vibium";

async function main() {
    const bro = await browser.start(); 
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/droppableItems.html");
    const origen = await page.find("#draggable");
    const destino = await page.find("#droppable");
    await origen.dragTo(destino);
    const texto = await destino.text();
    console.log("La zona de destino dice:", texto);
    await bro.stop();

}

main();