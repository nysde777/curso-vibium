import { mkdirSync, writeFileSync } from 'node:fs'
import { abrirNavegador } from './ayudantes.js'
import { extraerEmpleados } from './extraer.js'

const { bro, page } = await abrirNavegador()

try {
  const empleados = await extraerEmpleados(page)

  mkdirSync('datos', { recursive: true })
  const contenido = `export const empleados = ${JSON.stringify(empleados, null, 2)}\n`
  writeFileSync('datos/empleados.js', contenido)

  console.log(`Se guardaron ${empleados.length} empleados en datos/empleados.js`)
} finally {
  await bro.stop()
}
