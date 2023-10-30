if (window.location.pathname === "/Graphics") {
  let Ocu_P1 = 0;
  let Des_P1 = 0;
  let Ocu_P2 = 0;
  let Des_P2 = 0;
  let Ocu_P3 = 0;
  let Des_P3 = 0;
  let Ocu_P4 = 0;
  let Des_P4 = 0;
  let Ocu_P5 = 0;
  let Des_P5 = 0;

  async function Ficas() {
    try {
      Ocu_P1 = 0; // Reinicia los valores a cero
      Des_P1 = 0;
      Ocu_P2 = 0;
      Des_P2 = 0;
      Ocu_P3 = 0;
      Des_P3 = 0;
      Ocu_P4 = 0;
      Des_P4 = 0;
      Ocu_P5 = 0;
      Des_P5 = 0;
      await Gra1();
      await Gra2();
      await Gra3();
      await Gra4();
      await Gra5();
      Visual();
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }

  async function Gra1() {
    try {
      const response = await fetch("/get_data_1");
      const data = await response.json();

      for (const registro of data) {
        if (registro.valor === 1) {
          Ocu_P1++;
        } else if (registro.valor === 0) {
          Des_P1++;
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P1);
      console.log("Cantidad de registros con valor 0: " + Des_P1);
    } catch (error) {
      throw error;
    }
  }

  async function Gra2() {
    try {
      const response = await fetch("/get_data_2");
      const data = await response.json();

      for (const registro of data) {
        if (registro.valor === 1) {
          Ocu_P2++;
        } else if (registro.valor === 0) {
          Des_P2++;
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P2);
      console.log("Cantidad de registros con valor 0: " + Des_P2);
    } catch (error) {
      throw error;
    }
  }

  async function Gra3() {
    try {
      const response = await fetch("/get_data_3");
      const data = await response.json();

      for (const registro of data) {
        if (registro.valor === 1) {
          Ocu_P3++;
        } else if (registro.valor === 0) {
          Des_P3++;
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P3);
      console.log("Cantidad de registros con valor 0: " + Des_P3);
    } catch (error) {
      throw error;
    }
  }

  async function Gra4() {
    try {
      const response = await fetch("/get_data_4");
      const data = await response.json();

      for (const registro of data) {
        if (registro.valor === 1) {
          Ocu_P4++;
        } else if (registro.valor === 0) {
          Des_P4++;
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P4);
      console.log("Cantidad de registros con valor 0: " + Des_P4);
    } catch (error) {
      throw error;
    }
  }

  async function Gra5() {
    try {
      const response = await fetch("/get_data_5");
      const data = await response.json();

      for (const registro of data) {
        if (registro.valor === 1) {
          Ocu_P5++;
        } else if (registro.valor === 0) {
          Des_P5++;
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P5);
      console.log("Cantidad de registros con valor 0: " + Des_P5);
    } catch (error) {
      throw error;
    }
  }

  function Visual() {
    Vis1();
    Vis2();
    Vis3();
    Vis4();
    Vis5();
    function Vis1() {
      // El código de Visual se mantiene igual
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P1, Des_P1];

      var existingCanvas = document.getElementById("Piso1");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }
      var ctx = document.getElementById("Piso1").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["red", "blue"],
            },
          ],
        },
        options: {
          animation: {
            duration: 0, // Deshabilita la animación al crear el nuevo gráfico
          },
        },
      });
    }

    function Vis2() {
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P2, Des_P2];

      var existingCanvas = document.getElementById("Piso2");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso2").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["red", "blue"],
            },
          ],
        },
        options: {
          animation: {
            duration: 0, // Deshabilita la animación al crear el nuevo gráfico
          },
        },
      });
    }

    function Vis3() {
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P3, Des_P3];

      var existingCanvas = document.getElementById("Piso3");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso3").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["red", "blue"],
            },
          ],
        },
        options: {
          animation: {
            duration: 0, // Deshabilita la animación al crear el nuevo gráfico
          },
        },
      });
    }

    function Vis4() {
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P4, Des_P4];

      var existingCanvas = document.getElementById("Piso4");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso4").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["red", "blue"],
            },
          ],
        },
        options: {
          animation: {
            duration: 0, // Deshabilita la animación al crear el nuevo gráfico
          },
        },
      });
    }

    function Vis5() {
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P5, Des_P5];

      var existingCanvas = document.getElementById("Piso5");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso5").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["red", "blue"],
            },
          ],
        },
        options: {
          animation: {
            duration: 0, // Deshabilita la animación al crear el nuevo gráfico
          },
        },
      });
    }
  }

  // Llama a la función para actualizar datos inicialmente
  Ficas();

  // Programa la actualización cada 1 segundos
  setInterval(Ficas, 1000);
}
