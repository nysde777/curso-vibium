import { browser } from "vibium";

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    const bro = await browser.start();
    const page = await bro.page();
    await page.go("https://www.selenium.dev/selenium/web/web-form.html");
    console.log("Navegador abierto. Revisa las conexiones en los proximos 30 segundos.");
    
    await esperar(30000);
    await bro.stop();
}

main();