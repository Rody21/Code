function actualizarDatos() {
  // Realiza una solicitud AJAX para obtener los datos en formato JSON desde la ruta /get_data
  fetch("/get_data")
    .then((response) => response.json())
    .then((data) => {
      var dataContainer = document.getElementById("data-container");
      if (data.length > 0) {

        var table = document.createElement("table");
        table.id = "data-table";
        table.innerHTML = `
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Piso</th>
                            <th>Espacio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${data
                      .map(
                        (c) => `
                        <tr>
                            <td>${c.idParking}</td>
                            <td>${c.id_controlador}</td>
                            <td>${c.id_sensor}</td>
                            <td>${c.valor}</td>
                        </tr>
                    `
                      )
                      .join("")}
                    </tbody>
                `;
        // Reemplaza el contenido existente con los datos actualizados
        dataContainer.innerHTML = "";
        dataContainer.appendChild(table);
      } else {
        
        // Muestra un mensaje de error si no hay datos.
        var errorElement = document.createElement("p");
        errorElement.textContent =
          "Error, no hay datos disponibles para mostrar";
        errorElement.style.textAlign = "center";
        dataContainer.innerHTML = "";
        dataContainer.appendChild(errorElement);
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

// Llama a la función para actualizar datos inicialmente
actualizarDatos();

// Programa la actualización cada 5 segundos
setInterval(actualizarDatos, 5000);
