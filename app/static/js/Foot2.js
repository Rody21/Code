// Verifica si estás en la página Foot2 antes de ejecutar Dfoot2
if (window.location.pathname === "/Page2") {
  function Dfoot2() {
    fetch("/get_data_2")
      .then((response) => response.json())
      .then((data) => {
        const Espacios = document.getElementsByClassName("Piso2");
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
            } else {
              div_process.classList.remove("Ocupado");
              div_process.classList.add("Desocupado", "Park");
            }
          } else if(index_1 == 1) {
            //Ocupado
            if (div_process.classList.contains("Ocupado")) {
              countZero++;
            } else {
              div_process.classList.remove("Desocupado", "Park");
              div_process.classList.add("Ocupado");
            }
          }else{
            div_process.classList.remove("Ocupado");
            div_process.classList.remove("Desocupado", "Park");
            div_process.classList.add("arreglado");
          }
        }

        for (let i = 32; i <= 35; i++) {
          const index_1 = (data[i] && data[i].valor) ?? 0;
          div_process = Espacios[i];
          if (index_1 == 0) {
            //Desocupado
            if (div_process.classList.contains("Desocupado")) {
              countOne2++;
            } else {
              div_process.classList.remove("Ocupado2");
              div_process.classList.add("Desocupado", "Park");
            }
          } else {
            //Ocupado
            if (div_process.classList.contains("Ocupado2")) {
              countZero2++;
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
            } else {
              div_process.classList.remove("Ocupado3");
              div_process.classList.add("Desocupado", "Park");
            }
          } else {
            //Ocupado
            if (div_process.classList.contains("Ocupado3")) {
              countZero3++;
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
  Dfoot2();

  // Programa la actualización cada 1 segundo
  setInterval(Dfoot2, 1000);
}
