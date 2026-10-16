import {browser} from "vibium";
import {writeFileSync} from "fs";

async function main() {
    const bro = await browser.start();
    const page = await bro.newPage();

    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    const campo = await page.find({placeholder: "Type to search..."});
    await campo.type("Nueva York");
    const boton = await page.find({role: "button", text: "Submit"});
    await boton.click();
    await page.waitUntil.url("submitted-form.html");
    console.log("Formulario enviado correctamente");


    


    await bro.stop()
}
main();
