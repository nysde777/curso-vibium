import { browser } from 'vibium'
import { existsSync } from 'node:fs'

export const TIENDA = 'https://www.saucedemo.com'

// En local el usuario y la clave vienen del archivo .env
// En GitHub Actions vienen de los secretos (no hay archivo .env)
if (existsSync('.env')) {
  process.loadEnvFile('.env')
}

// Abre el navegador. En GitHub Actions (CI) se abre sin ventana
export async function abrirNavegador() {
  const bro = await browser.start({ headless: Boolean(process.env.CI) })
  const page = await bro.page()
  return { bro, page }
}

// Entra a la tienda con el usuario y la clave del .env
export async function iniciarSesion(page) {
  const usuario = process.env.SWAG_USUARIO
  const clave = process.env.SWAG_CLAVE

  if (!usuario || !clave) {
    throw new Error('Faltan SWAG_USUARIO o SWAG_CLAVE en el archivo .env')
  }

  await page.go(TIENDA)
  await page.find('[data-test="username"]').fill(usuario)
  await page.find('[data-test="password"]').fill(clave)
  await page.find('[data-test="login-button"]').click()
  await page.waitForURL('**/inventory.html')
}
