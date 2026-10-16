/*
 * Prueba: envío del formulario web de Selenium.
 *
 * 1. Abre https://www.selenium.dev/selenium/web/web-form.html
 * 2. Escribe "Nueva York" en el campo con placeholder "Type to search..."
 * 3. Hace clic en el botón "Submit"
 * 4. Confirma que el navegador llegó a "submitted-form.html" y muestra en
 *    consola "Formulario enviado correctamente".
 *
 * Todos los elementos se localizan con localizadores semánticos
 * (placeholder, role + text), sin selectores CSS ni XPath.
 */
import { browser } from "vibium";

async function main() {
    const bro = await browser.start();

    try {
        const page = await bro.newPage();
        await page.go("https://www.selenium.dev/selenium/web/web-form.html");

        const campoBusqueda = await page.find({ placeholder: "Type to search..." });
        await campoBusqueda.type("Nueva York");

        const botonSubmit = await page.find({ role: "button", text: "Submit" });
        await botonSubmit.click();

        await page.waitForURL("submitted-form.html");
        console.log("Formulario enviado correctamente");
    } finally {
        await bro.stop();
    }
}

main().catch((error) => {
    console.error("La prueba falló:", error);
    process.exitCode = 1;
});
