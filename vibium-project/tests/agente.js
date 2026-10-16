import { spawn } from "child_process";

import readline from "readline";
const servidor = spawn("npx vibium mcp", { shell: true });
const respuestas = readline.createInterface({ input: servidor.stdout });
const pendientes = new Map();

let numero = 0;

respuestas.on("line", (linea) => {
  const mensaje = JSON.parse(linea);
  if (pendientes.has(mensaje.id)) pendientes.get(mensaje.id)(mensaje);
});

function enviar(metodo, parametros = {}) {
  return new Promise((resolver) => {
    numero++;
    pendientes.set(numero, resolver);
    servidor.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: numero, method: metodo, params: parametros }) + "\n");
  });
}

async function usarHerramienta(nombre, argumentos = {}) {
  const respuesta = await enviar("tools/call", { name: nombre, arguments: argumentos });
  console.log(nombre, "->", respuesta.result.content[0].text);
}

async function main() {
  await enviar("initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "mi-agente", version: "1.0" } });

  const lista = await enviar("tools/list");
  console.log("Herramientas disponibles:", lista.result.tools.length);


  await usarHerramienta("browser_start");

  await usarHerramienta("browser_navigate", { url: "https://www.selenium.dev/selenium/web/web-form.html" });
  await usarHerramienta("browser_get_title");
  await usarHerramienta("browser_click", { selector: "button" });
  await usarHerramienta("browser_wait_for_url", { pattern: "submitted-form.html" });
  await usarHerramienta("browser_get_url");
  await usarHerramienta("browser_stop");

  servidor.kill();
}


main();