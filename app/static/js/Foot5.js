if (window.location.pathname === "/Page5") {
  function Dfoot5() {
    fetch("/get_data_5")
      .then((response) => response.json())
      .then((data) => {
        const Espacios = document.getElementsByClassName("Piso5");
        let countOne = 0;
        let countZero = 0;

        for (let i = 0; i < Espacios.length; i++) {
          const index_1 = (data[i] && data[i].valor) ?? 0;
          console.log(Espacios[i]);
          div_process = Espacios[i];
          if (index_1 == 0) {
            //Desocupado
            if (div_process.classList.contains("Desocupado")) {
              countOne++;
              console.log(countZero);
            } else {
              div_process.classList.remove("Ocupado");
              div_process.classList.add("Desocupado", "Park");
            }
          } else {
            //Ocupado
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
  Dfoot5();

  // Programa la actualización cada 1 segundos
  setInterval(Dfoot5, 1000);
}
