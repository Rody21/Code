function Dfoot1() {
  fetch("/get_data")
    .then((response) => response.json())
    .then((data) => {
      const Espacios = document.getElementsByClassName("Piso1");

      for (let i = 0; i < Espacios.length; i++) {
        index_1 = data[i].valor;
        console.log(Espacios[i]);
        div_process = Espacios[i];
        if (index_1 == 0) {
          //Desocupado
          if (div_process.classList.contains("Desocupado")) {
            console.log("OK");
          } else {
            div_process.classList.remove("Ocupado");
            div_process.classList.add("Desocupado", "Park");
          }
        } else {
          //Ocupado
          if (div_process.classList.contains("Ocupado")) {
            console.log("Ya");
          } else {
            div_process.classList.remove("Desocupado", "Park");
            div_process.classList.add("Ocupado");
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

// Llama a la función para actualizar datos inicialmente
Dfoot1();

// Programa la actualización cada 1 segundos
setInterval(Dfoot1, 1000);
