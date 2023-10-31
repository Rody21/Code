if (window.location.pathname === "/Usuario") {
  var controlador;
  var sensor;

  function Assing() {
    fetch("/get_data_Usuario")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].id_controlador);
        const MODO_AUTOMATICO = "Automatico";
        const MODO_MANUAL = "manual";
        const MIN_ID_SENSOR = 1;
        const MAX_ID_SENSOR = 9;

        function formatearNumero(numero) {
          return numero >= MIN_ID_SENSOR && numero <= MAX_ID_SENSOR
            ? "0" + numero
            : numero.toString();
        }

        function obtenerLetraControlador(idControlador) {
          const letrasControlador = {
            1: "A",
            2: "B",
            3: "C",
            4: "D",
            5: "E",
          };
          return letrasControlador[idControlador] || "Piso no valido";
        }

        const modo = MODO_MANUAL; //Modo de asignacion de usuarios
        asignarUbicacion(data, modo);

        function asignarUbicacion(data, modo) {
          let ubic;
          if (modo === MODO_MANUAL) {
            ubic = 0;
          } else if (modo === MODO_AUTOMATICO) {
            ubic = generarUbicacionAutomatica(data.length);
          }

          controlador = data[ubic].id_controlador;
          sensor = data[ubic].id_sensor;

          const posicion = formatearNumero(sensor);
          const letra = obtenerLetraControlador(controlador);
          console.log(controlador, sensor);

          actualizarElementoHTML(letra + posicion, controlador, sensor);
        }

        function generarUbicacionAutomatica(max) {
          const min = MIN_ID_SENSOR;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function actualizarElementoHTML(texto, controlador, sensor) {
          const Span_Visual = document.getElementById("Assing");
          Span_Visual.textContent = texto;
          Verificacion(controlador, sensor);

          const data = {
            controlador: controlador,
            sensor: sensor,
          };

          fetch("/actualizar_asignado", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Actualización de la base de datos exitosa");
              } else {
                console.error("Error en la actualización de la base de datos");
              }
            })
            .catch((error) => {
              console.error("Error al enviar la solicitud:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }
  // Llama a la función para actualizar datos inicialmente
  Assing();

  function Verificacion(controlador, sensor) {
    fetch("/get_data_Usuario1")
      .then((response) => response.json())
      .then((data) => {
        var encontrado = false;

        for (var i = 0; i < data.length; i++) {
          if (
            data[i].id_controlador === controlador &&
            data[i].id_sensor === sensor
          ) {
            encontrado = true;
            console.log("Encontrado");
            break;
          }
        }

        if (!encontrado) {
          Assing();
          console.log("No encontrado"); // Reemplaza 'tuFuncion' con el nombre de tu función
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
      });
  }

  // Programa la actualización cada 1 segundos
  setInterval(function () {
    Verificacion(controlador, sensor);
  }, 1000);
}
