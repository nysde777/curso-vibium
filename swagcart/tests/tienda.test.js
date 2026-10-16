import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { abrirNavegador, iniciarSesion } from '../ayudantes.js'

let bro
let page

before(async () => {
  ;({ bro, page } = await abrirNavegador())
  await iniciarSesion(page)
})

after(async () => {
  await bro?.stop()
})

test('al iniciar sesion la direccion tiene inventory.html', async () => {
  assert.match(await page.url(), /inventory\.html/)
})

test('el titulo dice Products', async () => {
  const titulo = await page.find('[data-test="title"]').text()
  assert.equal(titulo, 'Products')
})

test('hay 6 productos', async () => {
  const productos = await page.findAll('[data-test="inventory-item"]')
  assert.equal(productos.length, 6)
})

test('el contador del carrito sube al agregar productos', async () => {
  const botones = await page.findAll('[id^="add-to-cart"]')

  await botones[0].click()
  assert.equal(await page.find('[data-test="shopping-cart-badge"]').text(), '1')

  await botones[1].click()
  assert.equal(await page.find('[data-test="shopping-cart-badge"]').text(), '2')
})
