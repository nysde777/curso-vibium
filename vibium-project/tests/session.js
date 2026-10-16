import { browser } from "vibium";

const accion = process.argv[2];

async function main() {
    const bro = await browser.start();
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");

    if (accion === "guardar") {
        await page.evaluate("document.cookie = 'sesion=secreta123'; localStorage.setItem('token', 'abc')");
        console.log("Datos guardados en esta ejecucion");
    }
    console.log("Este navegador ve:", await page.evaluate("document.cookie + ' | token=' + localStorage.getItem('token')"));
    await bro.stop();
}
main();