export const TABLA = 'https://datatables.net/examples/core/basic_init/zero_configuration.html'

// Lee las filas que se ven en la pagina actual de la tabla
async function leerPaginaActual(page) {
  return page.evaluate(`
    Array.from(document.querySelectorAll('#example tbody tr')).map(fila => {
      const celdas = Array.from(fila.querySelectorAll('td')).map(td => td.innerText.trim())
      return {
        nombre: celdas[0],
        puesto: celdas[1],
        oficina: celdas[2],
        edad: Number(celdas[3]),
        fechaInicio: celdas[4],
        salario: celdas[5]
      }
    })
  `)
}

// Dice si el boton "siguiente" esta deshabilitado (ultima pagina)
async function esUltimaPagina(page) {
  const clase = await page.find('#example_wrapper .dt-paging-button.next').attr('class')
  return clase.includes('disabled')
}

// Lee la tabla completa recorriendo todas las paginas
export async function extraerEmpleados(page) {
  await page.go(TABLA)
  await page.find('#example tbody tr')

  const empleados = []
  while (true) {
    empleados.push(...(await leerPaginaActual(page)))
    if (await esUltimaPagina(page)) break
    await page.find('#example_wrapper .dt-paging-button.next').click()
  }
  return empleados
}
