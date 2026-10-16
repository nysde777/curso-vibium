import { browser } from "vibium";

async function main() {
    const bro = await browser.start();
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    const titulo = await page.evaluate("document.title");
    console.log("Titulo:", titulo);
    const campos = await page.evaluate("document.querySelectorAll('input').length");
    console.log("Campos input en la pagina:", campos);
    const datos = await page.evaluate("({ url: location.href, ancho: window.innerWidth, idioma: navigator.language })");
    const nuevoTitulo = await page.find({ text: "Formulario modificado" });
    console.log("Titulo nuevo:", await nuevoTitulo.text());
    await bro.stop();
}
main();