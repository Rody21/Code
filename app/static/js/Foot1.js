if (window.location.pathname === "/Page1") {
  function Dfoot1() {
    fetch("/get_data_1")
      .then((response) => response.json())
      .then((data) => {
        const Espacios = document.getElementsByClassName("Piso1");
        let countOne = 0;
        let countZero = 0;
        let countOne2 = 0;
        let countZero2 = 0;
        let countOne3 = 0;
        let countZero3 = 0;

        for (let i = 0; i <= 31; i++) {
          const index_1 = (data[i] && data[i].valor) ?? 0;
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

        for (let i = 32; i <= 35; i++) {
          const index_1 = (data[i] && data[i].valor) ?? 0;
          div_process = Espacios[i];
          if (index_1 == 0) {
            //Desocupado
            if (div_process.classList.contains("Desocupado")) {
              countOne2++;
              console.log(countZero2);
            } else {
              div_process.classList.remove("Ocupado2");
              div_process.classList.add("Desocupado", "Park");
            }
          } else {
            //Ocupado
            if (div_process.classList.contains("Ocupado2")) {
              countZero2++;
              console.log(countOne2);
            } else {
              div_process.classList.remove("Desocupado", "Park");
              div_process.classList.add("Ocupado2");
            }
          }
        }

        for (let i = 36; i <= 37; i++) {
          const index_1 = (data[i] && data[i].valor) ?? 0;
          div_process = Espacios[i];
          if (index_1 == 0) {
            //Desocupado
            if (div_process.classList.contains("Desocupado")) {
              countOne3++;
              console.log(countZero3);
            } else {
              div_process.classList.remove("Ocupado3");
              div_process.classList.add("Desocupado", "Park");
            }
          } else {
            //Ocupado
            if (div_process.classList.contains("Ocupado3")) {
              countZero3++;
              console.log(countOne3);
            } else {
              div_process.classList.remove("Desocupado", "Park");
              div_process.classList.add("Ocupado3");
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
  Dfoot1();

  // Programa la actualización cada 1 segundos
  setInterval(Dfoot1, 1000);
}
