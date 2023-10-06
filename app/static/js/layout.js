var socket = io.connect("http://" + document.domain + ":" + location.port);

socket.on("connect", function () {
  console.log("Conectado al servidor WebSocket");
});

socket.on("actualizar_tabla", function (data) {
  console.log("Datos actualizados:", data);
});
