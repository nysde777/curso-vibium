import {browser} from "vibium";
import {pathToFileURL} from "url";

async function main() {
    const bro = await browser.start();
    

    try{
        const page = await bro.page();
        const direccion = pathToFileURL("app.html").href;
        await page.go(direccion);
        const boton = await page.find({role: "button", name: "Sumar uno"});
        await boton.click();
        await boton.click();
        await boton.click();

        const resultado = await page.find("#contador");
        const texto = await resultado.text();

        if(texto !== "3") {
            throw new Error("Se esperaba que el contador fuera 3, pero se obtuvo: " + texto);
    }
    console.log("Verificado el contador funciona correctamente");
}finally{
    await bro.stop()
}
}
main();
