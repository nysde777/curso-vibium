import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { abrirNavegador } from '../ayudantes.js'
import { extraerEmpleados } from '../extraer.js'

let bro
let empleados

before(async () => {
  let page
  ;({ bro, page } = await abrirNavegador())
  empleados = await extraerEmpleados(page)
})

after(async () => {
  await bro?.stop()
})

test('lee todas las paginas de la tabla (57 empleados)', () => {
  assert.equal(empleados.length, 57)
})

test('cada empleado tiene todas las columnas', () => {
  for (const empleado of empleados) {
    assert.ok(empleado.nombre)
    assert.ok(empleado.puesto)
    assert.ok(empleado.oficina)
    assert.ok(empleado.edad > 0)
    assert.ok(empleado.fechaInicio)
    assert.match(empleado.salario, /^\$/)
  }
})

test('no hay empleados repetidos', () => {
  const nombres = new Set(empleados.map(e => e.nombre))
  assert.equal(nombres.size, empleados.length)
})
