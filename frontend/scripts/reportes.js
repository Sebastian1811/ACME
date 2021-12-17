let canvasProds = document.getElementById("ventasProductos").getContext('2d');
let canvasVentasEmpleados = document.getElementById("ventasPorEmpleado").getContext('2d');

// ------------------- VENTAS PRODUCTOS -------------------

// PRIMERO SE TRAEN EL NOMBRE DE LOS PRODUCTOS Y CUÁNTOS PRODUCTOS SON PARA SETEAR EL ARREGLO 'CANTIDADVENDIDASCADAPRODUCTO' EN 0S.
fetch(API_URL + "/productos")
.then(res => res.json())
.then(data => {
  let cantidadVendidasCadaProducto = [];
  Object.values(data)[0].forEach(productos => {
  chartP.data.labels.push(productos.nombre);
  cantidadVendidasCadaProducto.push(0);
  chartP.data.datasets[0].data.push(0);
  chartP.update();
  })
  //  SE TRAEN LAS FACTURAS PARA PODER AUMENTAR OBTENER LOS DETALLES DE CADA UNA
  fetch(API_URL + "/facturas")
  .then(res => res.json())
  .then(data => {
    Object.values(data)[0].forEach(facturas => {
      let id = facturas.id_factura;

      // SE TRAEN LOS DETALLES PARA TENER LAS CANTIDADES VENDIDAS DE CADA PRODUCTO VENDIDO EN LA FACTURA Y SE AÑADEN AL ARREGLO A MOSTRAR
      fetch(API_URL + "/factura/details/" + id)
      .then(res => res.json())
      .then(data => {
        let details = Object.values(data);

        for(let i=0; i<details[0].length; i++){
          let id_Producto = details[0][i].id_producto;
          let cant_Producto = details[0][i].cantidad;
          chartP.data.datasets[0].data[id_Producto - 1] += cant_Producto;
          chartP.update();
        }

        let cantidadProds = chartP.data.datasets[0].data;
        let indiceMayorCantidad = cantidadProds.indexOf(Math.max.apply(null, chartP.data.datasets[0].data));
        document.getElementById("maxProductosVendidos").innerHTML = chartP.data.labels[indiceMayorCantidad];

      })
      .catch(err => console.log(err))
    })
  })
  .catch(err => console.log(err))
})
.catch(err => console.log(err))

let chartP = new Chart(canvasProds, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      //"label": "Productos",
      data: [],
      fill: false,
      backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(255, 159, 64, 0.5)",
      "rgba(255, 205, 86, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)",
      "rgba(153, 102, 255, 0.5)", "rgba(201, 203, 207, 0.5)"
      ],
      borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
      "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
      ],
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
        display: false,
      },
      title: {
        display: false,
        text: "Productos más vendidos",
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  },
});

// ------------------- VENTAS POR EMPLEADO -------------------

// PRIMERO SE TRAEN EL NOMBRE DE LOS PRODUCTOS Y CUÁNTOS PRODUCTOS SON PARA SETEAR EL ARREGLO 'CANTIDADVENDIDASCADAPRODUCTO' EN 0S.
fetch(API_URL + "/empleado/ventas")
.then(res => res.json())
.then(data => {
  let cantidadVentasEmpleado = [];
  Object.values(data)[0].forEach(ventas => {
    chartV.data.labels.push(ventas.nombre + " " + ventas.apellido);
    chartV.data.datasets[0].data.push(ventas.ventasTotales);
    chartV.update();
  })

  let ventasEmpleado = chartV.data.datasets[0].data;
  let indiceMayorVentas = ventasEmpleado.indexOf(Math.max.apply(null, chartV.data.datasets[0].data));
  document.getElementById("maxVentasEmpleado").innerHTML = chartV.data.labels[indiceMayorVentas];
})
.catch(err => console.log(err))

let chartV = new Chart(canvasVentasEmpleados, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      //"label": "Productos",
      data: [],
      fill: false,
      backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)",
      "rgba(255, 205, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)",
      "rgba(153, 102, 255, 1)"
      ],
      borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
      "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
      ],
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        display: false,
      },
      title: {
        display: false,
        text: "Productos más vendidos",
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 500,
          beginAtZero: true,
        },
      },
    },
  },
});