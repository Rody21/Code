if (window.location.pathname === "/Graphics") {
  //Datos piso 1
  let Ocu_P1_N = 0;
  let Des_P1_N = 0;
  let Ocu_P1_D = 0;
  let Des_P1_D = 0;
  let Ocu_P1_V = 0;
  let Des_P1_V = 0;

  //Datos piso 2
  let Ocu_P2_N = 0;
  let Des_P2_N = 0;
  let Ocu_P2_D = 0;
  let Des_P2_D = 0;
  let Ocu_P2_V = 0;
  let Des_P2_V = 0;

  //Datos piso 3
  let Ocu_P3_N = 0;
  let Des_P3_N = 0;
  let Ocu_P3_D = 0;
  let Des_P3_D = 0;
  let Ocu_P3_V = 0;
  let Des_P3_V = 0;

  //Datos piso 4
  let Ocu_P4_N = 0;
  let Des_P4_N = 0;
  let Ocu_P4_D = 0;
  let Des_P4_D = 0;
  let Ocu_P4_V = 0;
  let Des_P4_V = 0;

  //Datos piso 5
  let Ocu_P5_N = 0;
  let Des_P5_N = 0;
  let Ocu_P5_D = 0;
  let Des_P5_D = 0;
  let Ocu_P5_V = 0;
  let Des_P5_V = 0;

  let Tipo = "doughnut";

  async function Ficas() {
    try {
      // Reinicia los valores a cero
      Ocu_P1_N = 0; //Piso1
      Des_P1_N = 0;
      Ocu_P1_D = 0;
      Des_P1_D = 0;
      Ocu_P1_V = 0;
      Des_P1_V = 0;

      Ocu_P2_N = 0; //Piso2
      Des_P2_N = 0;
      Ocu_P2_D = 0;
      Des_P2_D = 0;
      Ocu_P2_V = 0;
      Des_P2_V = 0;

      Ocu_P3_N = 0; //Piso3
      Des_P3_N = 0;
      Ocu_P3_D = 0;
      Des_P3_D = 0;
      Ocu_P3_V = 0;
      Des_P3_V = 0;

      Ocu_P4_N = 0; //Piso4
      Des_P4_N = 0;
      Ocu_P4_D = 0;
      Des_P4_D = 0;
      Ocu_P4_V = 0;
      Des_P4_V = 0;

      Ocu_P5_N = 0; //Piso5
      Des_P5_N = 0;
      Ocu_P5_D = 0;
      Des_P5_D = 0;
      Ocu_P5_V = 0;
      Des_P5_V = 0;

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
        const id_sensor = registro.id_sensor;
        if (id_sensor >= 0 && id_sensor <= 31) {
          if (registro.valor === 1) {
            Ocu_P1_N++;
          } else if (registro.valor === 0) {
            Des_P1_N++;
          }
        } else if (id_sensor >= 32 && id_sensor <= 35) {
          if (registro.valor === 1) {
            Ocu_P1_D++;
          } else if (registro.valor === 0) {
            Des_P1_D++;
          }
        } else if (id_sensor >= 36 && id_sensor <= 37) {
          if (registro.valor === 1) {
            Ocu_P1_V++;
          } else if (registro.valor === 0) {
            Des_P1_V++;
          }
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P1_N);
      console.log("Cantidad de registros con valor 0: " + Des_P1_N);
    } catch (error) {
      throw error;
    }
  }

  async function Gra2() {
    try {
      const response = await fetch("/get_data_2");
      const data = await response.json();

      for (const registro of data) {
        const id_sensor = registro.id_sensor;
        if (id_sensor >= 0 && id_sensor <= 31) {
          if (registro.valor === 1) {
            Ocu_P2_N++;
          } else if (registro.valor === 0) {
            Des_P2_N++;
          }
        } else if (id_sensor >= 32 && id_sensor <= 35) {
          if (registro.valor === 1) {
            Ocu_P2_D++;
          } else if (registro.valor === 0) {
            Des_P2_D++;
          }
        } else if (id_sensor >= 36 && id_sensor <= 37) {
          if (registro.valor === 1) {
            Ocu_P2_V++;
          } else if (registro.valor === 0) {
            Des_P2_V++;
          }
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P2_N);
      console.log("Cantidad de registros con valor 0: " + Des_P2_N);
    } catch (error) {
      throw error;
    }
  }

  async function Gra3() {
    try {
      const response = await fetch("/get_data_3");
      const data = await response.json();

      for (const registro of data) {
        const id_sensor = registro.id_sensor;
        if (id_sensor >= 0 && id_sensor <= 31) {
          if (registro.valor === 1) {
            Ocu_P3_N++;
          } else if (registro.valor === 0) {
            Des_P3_N++;
          }
        } else if (id_sensor >= 32 && id_sensor <= 35) {
          if (registro.valor === 1) {
            Ocu_P3_D++;
          } else if (registro.valor === 0) {
            Des_P3_D++;
          }
        } else if (id_sensor >= 36 && id_sensor <= 37) {
          if (registro.valor === 1) {
            Ocu_P3_V++;
          } else if (registro.valor === 0) {
            Des_P3_V++;
          }
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P3_N);
      console.log("Cantidad de registros con valor 0: " + Des_P3_N);
    } catch (error) {
      throw error;
    }
  }

  async function Gra4() {
    try {
      const response = await fetch("/get_data_4");
      const data = await response.json();

      for (const registro of data) {
        const id_sensor = registro.id_sensor;
        if (id_sensor >= 0 && id_sensor <= 31) {
          if (registro.valor === 1) {
            Ocu_P4_N++;
          } else if (registro.valor === 0) {
            Des_P4_N++;
          }
        } else if (id_sensor >= 32 && id_sensor <= 35) {
          if (registro.valor === 1) {
            Ocu_P4_D++;
          } else if (registro.valor === 0) {
            Des_P4_D++;
          }
        } else if (id_sensor >= 36 && id_sensor <= 37) {
          if (registro.valor === 1) {
            Ocu_P4_V++;
          } else if (registro.valor === 0) {
            Des_P4_V++;
          }
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P4_N);
      console.log("Cantidad de registros con valor 0: " + Des_P4_N);
    } catch (error) {
      throw error;
    }
  }

  async function Gra5() {
    try {
      const response = await fetch("/get_data_5");
      const data = await response.json();

      for (const registro of data) {
        const id_sensor = registro.id_sensor;
        if (id_sensor >= 0 && id_sensor <= 31) {
          if (registro.valor === 1) {
            Ocu_P5_N++;
          } else if (registro.valor === 0) {
            Des_P5_N++;
          }
        } else if (id_sensor >= 32 && id_sensor <= 35) {
          if (registro.valor === 1) {
            Ocu_P5_D++;
          } else if (registro.valor === 0) {
            Des_P5_D++;
          }
        } else if (id_sensor >= 36 && id_sensor <= 37) {
          if (registro.valor === 1) {
            Ocu_P5_V++;
          } else if (registro.valor === 0) {
            Des_P5_V++;
          }
        }
      }

      console.log("Cantidad de registros con valor 1: " + Ocu_P5_N);
      console.log("Cantidad de registros con valor 0: " + Des_P5_N);
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
    Vis6();

    function Vis1() {
      // El código de Visual se mantiene igual
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P1_N, Des_P1_N];
      var data_D = [Ocu_P1_D, Des_P1_D];
      var data_V = [Ocu_P1_V, Des_P1_V];

      var existingCanvas = document.getElementById("Piso1");
      var existingCanvas1 = document.getElementById("Discapacitados1");
      var existingCanvas2 = document.getElementById("Visitantes1");

      var existingChart = Chart.getChart(existingCanvas);
      var existingChart1 = Chart.getChart(existingCanvas1);
      var existingChart2 = Chart.getChart(existingCanvas2);

      if (existingChart) {
        existingChart.destroy();
      }
      if (existingChart1) {
        existingChart.destroy();
      }
      if (existingChart2) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso1").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
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

      var ctx = document.getElementById("Discapacitados1").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_D,
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

      var ctx = document.getElementById("Visitantes1").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_V,
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
      // El código de Visual se mantiene igual
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P2_N, Des_P1_N];
      var data_D = [Ocu_P2_D, Des_P2_D];
      var data_V = [Ocu_P2_V, Des_P2_V];

      var existingCanvas = document.getElementById("Piso2");
      var existingCanvas1 = document.getElementById("Discapacitados2");
      var existingCanvas2 = document.getElementById("Visitantes2");

      var existingChart = Chart.getChart(existingCanvas);
      var existingChart1 = Chart.getChart(existingCanvas1);
      var existingChart2 = Chart.getChart(existingCanvas2);

      if (existingChart) {
        existingChart.destroy();
      }
      if (existingChart1) {
        existingChart.destroy();
      }
      if (existingChart2) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso2").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
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

      var ctx = document.getElementById("Discapacitados2").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_D,
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

      var ctx = document.getElementById("Visitantes2").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_V,
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
      // El código de Visual se mantiene igual
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P1_N, Des_P1_N];
      var data_D = [Ocu_P3_D, Des_P3_D];
      var data_V = [Ocu_P3_V, Des_P3_V];

      var existingCanvas = document.getElementById("Piso3");
      var existingCanvas1 = document.getElementById("Discapacitados3");
      var existingCanvas2 = document.getElementById("Visitantes3");

      var existingChart = Chart.getChart(existingCanvas);
      var existingChart1 = Chart.getChart(existingCanvas1);
      var existingChart2 = Chart.getChart(existingCanvas2);

      if (existingChart) {
        existingChart.destroy();
      }
      if (existingChart1) {
        existingChart.destroy();
      }
      if (existingChart2) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso3").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
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

      var ctx = document.getElementById("Discapacitados3").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_D,
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

      var ctx = document.getElementById("Visitantes3").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_V,
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
      // El código de Visual se mantiene igual
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P4_N, Des_P4_N];
      var data_D = [Ocu_P4_D, Des_P4_D];
      var data_V = [Ocu_P4_V, Des_P4_V];

      var existingCanvas = document.getElementById("Piso4");
      var existingCanvas1 = document.getElementById("Discapacitados4");
      var existingCanvas2 = document.getElementById("Visitantes4");

      var existingChart = Chart.getChart(existingCanvas);
      var existingChart1 = Chart.getChart(existingCanvas1);
      var existingChart2 = Chart.getChart(existingCanvas2);

      if (existingChart) {
        existingChart.destroy();
      }
      if (existingChart1) {
        existingChart.destroy();
      }
      if (existingChart2) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso4").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
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

      var ctx = document.getElementById("Discapacitados4").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_D,
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

      var ctx = document.getElementById("Visitantes4").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_V,
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
      // El código de Visual se mantiene igual
      var labels = ["Ocupado", "Libre"];
      var data = [Ocu_P5_N, Des_P5_N];
      var data_D = [Ocu_P5_D, Des_P5_D];
      var data_V = [Ocu_P5_V, Des_P5_V];

      var existingCanvas = document.getElementById("Piso5");
      var existingCanvas1 = document.getElementById("Discapacitados5");
      var existingCanvas2 = document.getElementById("Visitantes5");

      var existingChart = Chart.getChart(existingCanvas);
      var existingChart1 = Chart.getChart(existingCanvas1);
      var existingChart2 = Chart.getChart(existingCanvas2);

      if (existingChart) {
        existingChart.destroy();
      }
      if (existingChart1) {
        existingChart.destroy();
      }
      if (existingChart2) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Piso5").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
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

      var ctx = document.getElementById("Discapacitados5").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_D,
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

      var ctx = document.getElementById("Visitantes5").getContext("2d");
      var myChart = new Chart(ctx, {
        type: Tipo,
        data: {
          labels: labels,
          datasets: [
            {
              data: data_V,
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

    function Vis6() {
      var labels = ["Ocupado", "Libre"];
      let Ocu_Total = Ocu_P1_N + Ocu_P2_N + Ocu_P3_N + Ocu_P4_N + Ocu_P5_N;
      let Des_Total = Des_P1_N + Des_P2_N + Des_P3_N + Des_P4_N + Des_P5_N;
      var data = [Ocu_Total, Des_Total];

      var existingCanvas = document.getElementById("Total");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("Total").getContext("2d");
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

      var labels = ["Ocupado", "Libre"];
      let Ocu_Total1 = Ocu_P1_D + Ocu_P2_D + Ocu_P3_D + Ocu_P4_D + Ocu_P5_D;
      let Des_Total1 = Des_P1_D + Des_P2_D + Des_P3_D + Des_P4_D + Des_P5_D;
      var data = [Ocu_Total1, Des_Total1];

      var existingCanvas = document.getElementById("DiscapacitadosT");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("DiscapacitadosT").getContext("2d");
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

      var labels = ["Ocupado", "Libre"];
      let Ocu_Total2 = Ocu_P1_V + Ocu_P2_V + Ocu_P3_V + Ocu_P4_V + Ocu_P5_V;
      let Des_Total2 = Des_P1_V + Des_P2_V + Des_P3_V + Des_P4_V + Des_P5_V;
      var data = [Ocu_Total2, Des_Total2];

      var existingCanvas = document.getElementById("VisitantesT");
      var existingChart = Chart.getChart(existingCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = document.getElementById("VisitantesT").getContext("2d");
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
