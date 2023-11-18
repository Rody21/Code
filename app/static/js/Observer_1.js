// Array para almacenar los tiempos de cambio de clase
const tiemposDeCambio = {};

// Función para registrar el tiempo de cambio de clase
function registrarTiempoDeCambio(id, tiempo) {
  if (!tiemposDeCambio[id]) {
    tiemposDeCambio[id] = [];
  }
  tiemposDeCambio[id].push(tiempo);
}

// Función para calcular el tiempo promedio de cambio de clase
function calcularTiempoPromedio() {
  const promedios = {};
  for (const id in tiemposDeCambio) {
    const tiempos = tiemposDeCambio[id];
    const sumaTiempos = tiempos.reduce((acc, curr) => acc + curr, 0);
    const promedio = sumaTiempos / tiempos.length;
    promedios[id] = promedio;
  }
  return promedios;
}

// Función para enviar los datos al servidor Flask
function enviarDatosAlServidor(data) {
  fetch("/guardar-tiempos_1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al enviar datos al servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos enviados al servidor:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Selecciona todos los elementos con la clase 'Piso1'
const elementosPiso1 = document.querySelectorAll(".Piso1");

// Itera sobre cada elemento y agrega un observador de mutaciones
elementosPiso1.forEach((elemento) => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const endTime = performance.now(); // Tiempo actual
        const loadTime = endTime - startTime; // Calcula el tiempo que tardó en cambiar la clase
        const elementoID = elemento.id;
        registrarTiempoDeCambio(elementoID, loadTime);
        console.log(
          `El elemento con ID '${elementoID}' cambió de clase. Tiempo de cambio: ${loadTime} ms`
        );

        const promedios = calcularTiempoPromedio();
        console.log("Tiempos promedio de cambio:", promedios);

        enviarDatosAlServidor(promedios); // Enviar datos al servidor Flask
      }
    });
  });

  // Configura el observador para observar cambios en los atributos de clase
  observer.observe(elemento, { attributes: true });
});

// Marca el tiempo inicial cuando el script se carga
const startTime = performance.now();
