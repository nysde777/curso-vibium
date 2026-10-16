import { browser } from "vibium";
import { writeFileSync } from "fs";
import { resolve } from "path";

async function main() {
    writeFileSync("documento.txt", "Hola desde Vibium");
    const ruta = resolve("documento.txt");
    const bro = await browser.start();
    const page = await bro.page();
    await page.setContent(`
        <canvas id="lienzo" width="300" height="200" style="border:1px solid black"></canvas>
        <script>
        const lienzo = document.getElementById("lienzo");
        const ctx = lienzo.getContext("2d");
        ctx.lineWidth = 5;
        let dibujando = false;
        lienzo.addEventListener("mousedown", (e) => { dibujando = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
        lienzo.addEventListener("mousemove", (e) => { if (dibujando) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } });
        lienzo.addEventListener("mouseup", () => { dibujando = false; });
        </script>
    `);
    const lienzo = await page.find("#lienzo");
    const caja = await lienzo.bounds();
    await page.mouse.move(caja.x + 50, caja.y + 100); 
    await page.mouse.down(); 
    await page.mouse.move(caja.x + 250, caja.y + 100);
    await page.mouse.up(); 
    const pintado = await page.evaluate("document.getElementById('lienzo').getContext('2d').getImageData(150, 100, 1, 1).data[3] > 0");
    console.log("Se dibujo la linea en el lienzo:", pintado);
    writeFileSync("dibujo.png", await page.screenshot());
    await bro.stop();
}
main();