if (window.location.pathname === "/M_Users") {
  let previousData = []; // Almacena los datos anteriores

  // Mover la función que crea la tabla a una función independiente
  function createTable() {
    fetch("/obtener_usuarios")
      .then((response) => response.json())
      .then((data) => {
        // Procesar los datos recibidos
        var tabla = document.getElementById("tabla-usuarios");
        tabla.innerHTML = ""; // Limpiar la tabla antes de actualizar

        // Crear los títulos de las columnas
        var encabezado =
          "<tr>" +
          "<th>ID</th>" +
          "<th>Nombre</th>" +
          "<th>Placa</th>" +
          "<th>Correo</th>" +
          "<th>Tipo</th>" +
          "</tr>";
        tabla.innerHTML += encabezado;

        // Crear filas de datos
        data.forEach((usuario) => {
          var fila =
            "<tr>" +
            "<td>" +
            usuario.id +
            "</td>" +
            "<td>" +
            usuario.username +
            "</td>" +
            "<td>" +
            usuario.placa +
            "</td>" +
            "<td>" +
            usuario.correo +
            "</td>" +
            "<td>" +
            (usuario.tipe === 1
              ? "Administrador"
              : usuario.tipe === 2
              ? "Usuario"
              : "") +
            "</td>" +
            "</tr>";
          tabla.innerHTML += fila;
        });

        const newDataString = JSON.stringify(data);
        const previousDataString = JSON.stringify(previousData);

        // Comprobar si los datos han cambiado
        if (newDataString !== previousDataString) {
          // Actualizar el dropdown solo si los datos han cambiado
          var dropdown = document.getElementById("dropdown");
          dropdown.innerHTML = ""; // Limpiar el dropdown antes de actualizar

          data.forEach((usuario) => {
            var option = document.createElement("option");
            option.value = usuario.id;
            option.textContent = usuario.id;
            dropdown.appendChild(option);
          });

          // Actualizar los datos anteriores
          previousData = data;
        }
      });
  }

  // Llamar a la función createTable para que se ejecute cada segundo
  setInterval(createTable, 500);

  var formulario = document.getElementById("formulario-usuario");
  var formulario2 = document.getElementById("formulario-usuario-eliminar");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var tipe = parseInt(document.getElementById("tipe").value);
    var placa = document.getElementById("placa").value.toUpperCase(); // Convertir a mayúsculas
    var password = document.getElementById("password").value;

    // Validar que el campo "tipe" sea 1 o 2
    if (tipe !== 1 && tipe !== 2) {
      alert("El tipo debe ser 1 (Administrador) o 2 (Usuario).");
      return;
    }

    var nuevoUsuario = {
      nombre: nombre,
      email: email,
      tipe: tipe,
      placa: placa,
      password: password,
    };

    // Realizar la solicitud AJAX (fetch) y enviar los datos al servidor
    fetch("/agregar_usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => {
        if (response.ok) {
          createTable();
          console.log("Actualización de la base de datos exitosa");
        } else {
          console.error("Error en la actualización de la base de datos");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  });

  formulario2.addEventListener("submit", function (event) {
    event.preventDefault();

    var dropdownValue = document.getElementById("dropdown").value; // Obtener el valor seleccionado del dropdown

    var id_Usuario = {
      dropdownValue: dropdownValue, // Enviar solo el valor del dropdown
    };

    // Realizar la solicitud AJAX (fetch) y enviar solo el valor del dropdown al servidor
    fetch("/quitar_usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id_Usuario),
    })
      .then((response) => {
        if (response.ok) {
          createTable();
          console.log("Actualización de la base de datos exitosa");
          // Limpia el formulario después de agregar el usuario
          document.getElementById("formulario-usuario-eliminar").reset();
        } else {
          console.error("Error en la actualización de la base de datos");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  });

  // Función para limpiar el formulario
  function limpiarFormulario() {
    document.getElementById("formulario-usuario").reset();
  }
}
