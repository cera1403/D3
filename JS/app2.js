
(async () => {
  const data = await d3.csv(
    "data/compraventa_de_viviendas_anual.csv",
    d3.autoType
  );

  var chartData = data.map((o) => ({
    year: o["Año"],
    compraventa: o["Compraventa de viviendas"],
  }));

  const barchart = BarChart(chartData, {
    x: (d) => d.year,
    y: (d) => d.compraventa,
    yFormat: "d",
    yLabel: "↑ N° Compraventas",
    width: 1200, // ancho
    height: 610, // alto
    color: "steelblue",
  });

  d3.select("#graf").append(() => barchart);
})();




