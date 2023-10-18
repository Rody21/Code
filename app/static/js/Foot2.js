// Verifica si estás en la página Foot2 antes de ejecutar Dfoot2
if (window.location.pathname === "/Page2") {
  function Dfoot2() {
    fetch("/get_data_2")
      .then((response) => response.json())
      .then((data) => {
        const Espacios = document.getElementsByClassName("Piso2");
        let countOne = 0;
        let countZero = 0;

        for (let i = 0; i < Espacios.length; i++) {
          const index_1 = (data[i] && data[i].valor) ?? 0;
          console.log(Espacios[i]);
          div_process = Espacios[i];
          if (index_1 == 0) {
            // Desocupado
            if (div_process.classList.contains("Desocupado")) {
              countOne++;
              console.log(countZero);
            } else {
              div_process.classList.remove("Ocupado");
              div_process.classList.add("Desocupado", "Park");
            }
          } else {
            // Ocupado
            if (div_process.classList.contains("Ocupado")) {
              countZero++;
              console.log(countOne);
            } else {
              div_process.classList.remove("Desocupado", "Park");
              div_process.classList.add("Ocupado");
            }
          }
        }

        document.getElementById("cantidad_uno").textContent = countOne;
        document.getElementById("cantidad_cero").textContent = countZero;
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }

  // Llama a la función para actualizar datos inicialmente
  Dfoot2();

  // Programa la actualización cada 1 segundo
  setInterval(Dfoot2, 1000);
}
