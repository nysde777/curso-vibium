import { browser } from "vibium";

async function main() {
    const bro = await browser.start();
    const page = await bro.page();
    await page.setViewport({ width: 390, height: 844 });
    
    page.onResponse((respuesta) => {
        console.log("Red:", respuesta.status(), respuesta.url());
    });

    page.onConsole((mensaje) => {
        console.log("Consola:", mensaje.type(), mensaje.text());
    });

    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    await page.evaluate("console.log('Hola desde la pagina')");
    const ancho = await page.evaluate("window.innerWidth");
    console.log("Ancho de pantalla que ve la pagina:", ancho);
    await bro.stop();
}
main();