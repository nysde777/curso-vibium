import { browser } from "vibium";
import { writeFileSync } from "fs";
import { resolve } from "path";

async function main() {
    writeFileSync("documento.txt", "Hola desde Vibium");
    const ruta = resolve("documento.txt");
    const bro = await browser.start();
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    const campoArchivo = await page.find('[name="my-file"]');
    await campoArchivo.setFiles([ruta]);
    const nombre = await page.evaluate("document.querySelector('[name=my-file]').files[0].name");
    console.log("Archivo seleccionado:", nombre);
    await bro.stop();
}
main();