if (window.location.pathname === "/Usuario") {
  var controlador;
  var sensor;
  var ejecucionContinua = true; // Variable para controlar la ejecución
  var alrt = false;
  const mensajeAsignacionP = document.getElementById("mensajeAsignacion");
  const mensajeNumeroP = document.getElementById("mostrar");

  function Assing() {
    if (!ejecucionContinua) return;
    fetch("/get_data_Usuario")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.length === 0) {
          // No hay datos disponibles
          mensajeAsignacionP.textContent =
            "No hay espacio disponible por el momento";
          mensajeNumeroP.classList.remove("Space");
          mensajeNumeroP.classList.add("N_Space");
          // Reintentar obtener datos en un intervalo
          setTimeout(Assing, 2000); // Reintentar cada 2 segundos
        } else {
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
            mensajeNumeroP.classList.remove("N_Space");
            mensajeNumeroP.classList.add("Space");
            mensajeAsignacionP.textContent = "Se le ha asignado el espacio:";
            alrt = true;
            Verificacion(controlador, sensor);

            const datos = {
              controlador: controlador,
              sensor: sensor,
            };

            fetch("/actualizar_asignado", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(datos),
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Actualización de la base de datos exitosa");
                } else {
                  console.error(
                    "Error en la actualización de la base de datos"
                  );
                }
              })
              .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
              });
          }
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
          const confirmacion = window.confirm(
            "¿Desea asignar una nueva ubicación?"
          );
          if (confirmacion) {
            Assing();
          } else {
            ejecucionContinua = false; // Detiene la ejecución
            const mensajeAsignacionP =
              document.getElementById("mensajeAsignacion");
            mensajeAsignacionP.textContent = "Parqueado en: "; // Cambia el texto del párrafo
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
        setTimeout(Assing, 2000);
      });
  }

  // Programa la actualización cada 1 segundos
  setInterval(function () {
    if (ejecucionContinua) {
      if (alrt == true) {
        Verificacion(controlador, sensor);
      }
    }
  }, 1000);
}
