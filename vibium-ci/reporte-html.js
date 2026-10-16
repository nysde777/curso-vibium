
export default async function* reporteHtml(eventos) {

  const resultados = [];

  for await (const evento of eventos) {

    if (evento.type !== "test:pass" && evento.type !== "test:fail") continue;

    if (evento.data.details?.type === "suite") continue;

    resultados.push({
      nombre: evento.data.name,
      paso: evento.type === "test:pass",
      segundos: ((evento.data.details?.duration_ms ?? 0) / 1000).toFixed(1),
    });
  }

  const pasaron = resultados.filter((r) => r.paso).length;

  const filas = resultados
    .map((r) => `<tr><td>${r.nombre}</td><td style="color:${r.paso ? "green" : "red"}">${r.paso ? "PASO" : "FALLO"}</td><td>${r.segundos} s</td></tr>`)
    .join("\n");

  yield `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Reporte de pruebas</title></head>
<body style="font-family:sans-serif">
<h1>Reporte de pruebas Vibium</h1>
<p>${pasaron} de ${resultados.length} pruebas pasaron</p>
<table border="1" cellpadding="6"><tr><th>Prueba</th><th>Resultado</th><th>Duracion</th></tr>
${filas}
</table>
</body></html>`;
}