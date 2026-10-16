Crea tests/titulo.test.js con node:test y Vibium (import { browser } from "vibium").
Abre https://www.selenium.dev/selenium/web/web-form.html y comprueba que el título sea "Web form".
Usa browser.start({ headless: !!process.env.CI }), page.go (no goto), try/finally con bro.stop().
Comentario en español arriba de cada línea. Ejecuta npm test al terminar.

Crea tests/formulario.test.js con node:test y Vibium (import { browser } from "vibium").
Abre https://www.selenium.dev/selenium/web/web-form.html, escribe "Prueba CI" en [name="my-text"],
haz clic en page.find({ role: "button", text: "Submit" }), espera con page.waitUntil.url("submitted-form.html")
y comprueba que la URL contenga "my-text=Prueba+CI".
Usa browser.start({ headless: !!process.env.CI }), page.go (no goto), try/finally con bro.stop().
Comentario en español arriba de cada línea. Ejecuta npm test al terminar.

