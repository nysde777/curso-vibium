import { abrirNavegador, iniciarSesion } from './ayudantes.js'

const { bro, page } = await abrirNavegador()
const grabacion = page.context.recording

try {
  await grabacion.start({ screenshots: true, snapshots: true, path: 'grabacion.zip' })

  await iniciarSesion(page)

  // agregar un producto y abrir el carrito
  await page.find('[id^="add-to-cart"]').click()
  await page.find('[data-test="shopping-cart-link"]').click()
  await page.find('[data-test="checkout"]').click()

  // datos de envio (de prueba)
  await page.find('[data-test="firstName"]').fill('Ana')
  await page.find('[data-test="lastName"]').fill('Perez')
  await page.find('[data-test="postalCode"]').fill('12345')
  await page.find('[data-test="continue"]').click()
  await page.find('[data-test="finish"]').click()

  const mensaje = await page.find('[data-test="complete-header"]').text()
  console.log(`Compra terminada: ${mensaje}`)
} finally {
  const resultado = await grabacion.stop()
  console.log(`Grabacion guardada en ${resultado.path}`)
  await bro.stop()
}
