/////////////////////////////////////////////////////////////////////////////////CONSTANTESGLOBALES///////////////////////////////////////////////////////////////////
const WidthCaja = 480;
const HeightCaja = 550;
let primeracolumna = ""
////////////////////////////////////////////////////////////////////////////////GRAFICAS (1)//////////////////////////////////////////////////////////////////////////

const draw = async (el = "#PIB1") => {
  let data = await d3.csv(
    "https://raw.githubusercontent.com/cera1403/D3/main/Datasets/dataPib.csv",
  d3.autoType
  );

  const ComboSelect = d3.select("#Combo1");
  let len = document.getElementById("Combo1").length;
  let val = document.getElementById("Combo1").value;

  if (len==1) {
    let headerNames = data.columns;
      ComboSelect.selectAll("option")
      .data(headerNames)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d); 
  }
  
  //Seleccionamos el primer filtro
  if (ComboSelect.empty()) {
   primeracolumna = data.columns[1]; 
     
  }
  else
  {
    primeracolumna =val 
  
  }

  let max = d3.max(data.map((d) => d[primeracolumna]));
 
  //Ordenamos y Sacamos el Máximo
  data.sort(function (a, b) {
    return d3.ascending(a[primeracolumna], b[primeracolumna]);
  });

// Accessors
  const yAccessor = (d) => d.Año
  const margin = { top: 20, right: 10, bottom: 40, left: 90 },
    width = WidthCaja - margin.left - margin.right,
    height = HeightCaja - margin.top - margin.bottom;

  const svg = d3
    .select("#PIB1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 const x = d3.scaleLinear().domain([0, max]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-0)")
    .style("text-anchor", "end");

  const y = d3
    .scaleBand()
    .range([0, height])
  .domain(
      data.map(function (d) {
        return d.Año;
     })    )
     .padding(0.1);

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .transition()
    .duration(1000)
    .ease(d3.easeBounce)
    .attr("x", x(0))
    .attr("y", (d) => y(yAccessor(d)))
    //.attr("width", (d) => x(xAccessor(d)))
    .attr("width",  function(d) { return x(d[primeracolumna]); })
    .attr("height", y.bandwidth())
    .attr("fill", "#457b9d");   

  svg 
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("x", x(0))
  .attr("y", (d) => y(yAccessor(d)))
  .text(function(d) {x(d[primeracolumna]);})
   
};
draw()

d3.select("#Combo1").on("change", () => {    
 d3.select("svg")
 .remove(); 
 draw()
})





