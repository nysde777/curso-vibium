import { browser } from "vibium";

try {
    process.loadEnvFile();
} catch {

}
const clave = process.env.CLAVE_PRUEBA;
if (!clave){
    throw new Error("Falta la variable CLAVE_PRUEBA. Definela en el archivo .env");
}

async function main() {
    const bro = await browser.start();
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    const campo = await page.find('[name="my-password"]');
    await campo.fill(clave);
    const largo = await page.evaluate("document.querySelector('[name=my-password]').value.length");
    console.log("Contrasena escrita en el campo, con", largo, "caracteres");
    await bro.stop();
}
main();