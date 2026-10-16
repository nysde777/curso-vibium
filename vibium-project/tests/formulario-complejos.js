import {browser} from 'vibium';

async function main() {
    const bro = await browser.start();
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    const fecha = await page.find('[name="my-date"]');
    await fecha.fill("10/10/2026");
    const nombre = await page.find('[name="my-text"]');
    await nombre.fill("Ana Torres");
    const clave = await page.find('[name="my-password"]');
    await clave.fill("clave123");
    const comentario = await page.find('[name="my-textarea"]');
    await comentario.fill("Comentario de prueba");
    const desplegable = await page.find('[name="my-select"]');
    await desplegable.selectOption("2");
    const ciudad = await page.find({ placeholder: "Type to search..." });
    await ciudad.fill("Seattle");
    const casillaMarcada = await page.find("#my-check-1");
    await casillaMarcada.uncheck();
    const casillaVacia = await page.find("#my-check-2");
    await casillaVacia.check();
    const opcion = await page.find("#my-radio-2");
    await opcion.click();
    const boton = await page.find({ role: "button", text: "Submit" });
    await boton.click();
    await page.waitUntil.url("submitted-form.html");
    const url = await page.url();
    const esperados = ["my-text=Ana+Torres", "my-password=clave123", "my-select=2", "my-datalist=Seattle", "my-date=10%2F10%2F2026"];

    for (const valor of esperados) {
        console.log(url.includes(valor) ? "OK   " : "FALTA", valor);
    }

    await bro.stop();
};
main();