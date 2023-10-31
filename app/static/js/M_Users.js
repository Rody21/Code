if (window.location.pathname === "/M_Users") {
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
      });
  }

  // Llamar a la función createTable para que se ejecute cada segundo
  setInterval(createTable, 500);

  var formulario = document.getElementById("formulario-usuario");

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
}
