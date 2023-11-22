import os

SELECT_ALL = "SELECT * FROM Parking"
SELECT_ORDER = "SELECT * FROM Parking ORDER BY id_controlador, id_sensor;"
SELECT_FOOT1 = "SELECT * FROM Parking WHERE id_controlador=1 ORDER BY id_sensor"
SELECT_FOOT2 = "SELECT * FROM Parking WHERE id_controlador=2 ORDER BY id_sensor"
SELECT_FOOT3 = "SELECT * FROM Parking WHERE id_controlador=3 ORDER BY id_sensor"
SELECT_FOOT4 = "SELECT * FROM Parking WHERE id_controlador=4 ORDER BY id_sensor"
SELECT_FOOT5 = "SELECT * FROM Parking WHERE id_controlador=5 ORDER BY id_sensor"

USUARIOS = "SELECT * FROM Usuarios WHERE username = %s AND password = %s"

ASIGNACION = "SELECT * FROM Parking WHERE valor=0 AND asignado=0 ORDER BY id_controlador ASC, id_sensor ASC"
ASIGNACION1 = (
    "SELECT * FROM Parking WHERE valor=0 ORDER BY id_controlador ASC, id_sensor ASC"
)

ADMIN_U = "SELECT id, username, placa, correo, tipe FROM Usuarios ORDER BY id"

INSERT_U = "INSERT INTO PF.Usuarios (username, password, placa, tipe, Correo) VALUES (%s, %s, %s, %s, %s);"
DELET_U = "DELETE FROM `PF`.`Usuarios` WHERE (`id` = %s);"

UPDATE_ASIG = (
    "UPDATE PF.Parking SET asignado=1 WHERE id_controlador=%s AND id_sensor=%s"
)
