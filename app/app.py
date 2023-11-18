from flask import (
    Flask,
    render_template,
    url_for,
    redirect,
    jsonify,
    Response,
    session,
    request,
    jsonify,
)
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from confiDB import *
from dotenv import load_dotenv
from querys import *
from config import *
import re
import logging
import pymysql
import csv
import time
from datetime import datetime

app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.secret_key = "36e42c5ca26b572eef30e0573a6701614eb86e828bf60d9c41b5edfcc50b8dad"


# Función para realizar la consulta a la base de datos y actualizar los datos
def actualizar_datos(query, data_key):
    start_time = time.time()
    conexion_MySQLdb = connectionBD()
    mycursor = conexion_MySQLdb.cursor(dictionary=True)
    mycursor.execute(query)
    data = mycursor.fetchall()
    total = mycursor.rowcount
    mycursor.close()
    conexion_MySQLdb.close()
    end_time = time.time()  # Registra la hora de finalización
    timestamp = datetime.now()
    elapsed_time = end_time - start_time  # Calcula el tiempo transcurrido
    print(f"Actualización de datos a las {datetime.now()}: {total} registros")
    app.config[data_key] = data

    # Guardar los datos en csv
    current_date = timestamp.strftime("%Y-%m-%d")
    csv_file_path = f"{current_date}.csv"

    # Guarda los datos en formato CSV en la misma carpeta
    with open(csv_file_path, "a", newline="") as csv_file:
        csv_writer = csv.writer(csv_file)
        # Escribir una fila con los datos de la consulta
        csv_writer.writerow([query, timestamp, elapsed_time, total])


# Función para guardar los tiempos de cambio en un archivo CSV
@app.route("/guardar-tiempos_1", methods=["POST"])
def guardar_tiempos_1():
    try:
        data = request.get_json()

        # Procesar los datos recibidos
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        csv_file_path = "tiempos_cambio_1.csv"

        # Guardar los datos en el archivo CSV
        with open(csv_file_path, "a", newline="") as file:
            writer = csv.writer(file)
            for elemento_id, tiempo_promedio in data.items():
                writer.writerow([timestamp, elemento_id, tiempo_promedio])

        return jsonify({"mensaje": "Datos guardados correctamente en el archivo CSV"})

    except Exception as e:
        return jsonify({"error": str(e)})


# Función para guardar los tiempos de cambio en un archivo CSV
@app.route("/guardar-tiempos_2", methods=["POST"])
def guardar_tiempos_2():
    try:
        data = request.get_json()

        # Procesar los datos recibidos
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        csv_file_path = "tiempos_cambio_2.csv"

        # Guardar los datos en el archivo CSV
        with open(csv_file_path, "a", newline="") as file:
            writer = csv.writer(file)
            for elemento_id, tiempo_promedio in data.items():
                writer.writerow([timestamp, elemento_id, tiempo_promedio])

        return jsonify({"mensaje": "Datos guardados correctamente en el archivo CSV"})

    except Exception as e:
        return jsonify({"error": str(e)})


def configurar_programador(query, intervalo, data_key):
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        lambda: actualizar_datos(query, data_key), "interval", seconds=intervalo
    )
    scheduler.start()
    return scheduler


programador1 = configurar_programador(SELECT_FOOT1, 10, "dataParking1")
programador2 = configurar_programador(SELECT_FOOT2, 10, "dataParking2")
programador3 = configurar_programador(SELECT_FOOT3, 10, "dataParking3")
programador4 = configurar_programador(SELECT_FOOT4, 10, "dataParking4")
programador5 = configurar_programador(SELECT_FOOT5, 10, "dataParking5")
programador6 = configurar_programador(ASIGNACION, 10, "asignacion")
programador7 = configurar_programador(ADMIN_U, 10, "data_U")
programador8 = configurar_programador(ASIGNACION1, 10, "asignacion1")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST" and "usuario" in request.form and "password":
        _username = request.form["usuario"]
        _password = request.form["password"]

        conexion_User = connectionBD()
        mycursor = conexion_User.cursor()
        mycursor.execute(
            USUARIOS,
            (
                _username,
                _password,
            ),
        )
        data_U = mycursor.fetchone()

        if data_U:
            session["logueado"] = True
            session["id"] = data_U[0]
            session["id_rol"] = data_U[4]

            if session["id_rol"] == 1:
                return redirect(url_for("Piso1"))
            elif session["id_rol"] == 2:
                return redirect(url_for("Usuario"))
        else:
            return render_template("index.html")

    return render_template("index.html")


# Configura la conexión a la base de datos MySQL
db_params = {
    "host": HOST,
    "user": USER,
    "password": PASSWORD,
    "db": DB,
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor,
}


@app.route("/actualizar_asignado", methods=["POST"])
def actualizar_asignado():
    try:
        data = request.get_json()
        controlador = data["controlador"]
        sensor = data["sensor"]

        connection = pymysql.connect(**db_params)
        cursor = connection.cursor()
        query = UPDATE_ASIG
        cursor.execute(query, (controlador, sensor))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"mensaje": "Registro actualizado correctamente"})

    except Exception as e:
        return jsonify({"error": str(e)})


# Ruta para agregar un nuevo usuario
@app.route("/agregar_usuario", methods=["POST"])
def agregar_usuario_route():
    try:
        data = request.get_json()
        nombre = data["nombre"]
        email = data["email"]
        placa = data["placa"]
        tipe = data["tipe"]
        password = data["password"]

        connection = pymysql.connect(**db_params)
        cursor = connection.cursor()
        query = INSERT_U
        cursor.execute(query, (nombre, password, placa, tipe, email))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"mensaje": "Registro actualizado correctamente"})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/get_data_1")
def get_data_1():
    data = app.config.get("dataParking1", [])
    return jsonify(data)


@app.route("/get_data_2")
def get_data_2():
    data = app.config.get("dataParking2", [])
    return jsonify(data)


@app.route("/get_data_3")
def get_data_3():
    data = app.config.get("dataParking3", [])
    return jsonify(data)


@app.route("/get_data_4")
def get_data_4():
    data = app.config.get("dataParking4", [])
    return jsonify(data)


@app.route("/get_data_5")
def get_data_5():
    data = app.config.get("dataParking5", [])
    return jsonify(data)


@app.route("/get_data_Usuario")
def get_data_Usuario():
    data = app.config.get("asignacion", [])
    return jsonify(data)


@app.route("/get_data_Usuario1")
def get_data_Usuario1():
    data = app.config.get("asignacion1", [])
    return jsonify(data)


@app.route("/obtener_usuarios")
def obtener_usuarios():
    data = app.config.get("data_U", [])
    return jsonify(data)


@app.route("/Page1")
def Piso1():
    return render_template("Foot1.html")


@app.route("/Page2")
def Piso2():
    return render_template("Foot2.html")


@app.route("/Page3")
def Piso3():
    return render_template("Foot3.html")


@app.route("/Page4")
def Piso4():
    return render_template("Foot4.html")


@app.route("/Page5")
def Piso5():
    return render_template("Foot5.html")


@app.route("/Graphics")
def Graphics():
    # Datos para el gráfico circular
    return render_template("Graphics.html")


@app.route("/Usuario")
def Usuario():
    return render_template("Usuario.html")


@app.route("/M_Users")
def M_Users():
    return render_template("M_Users.html")


# Manejo de errores 404
@app.errorhandler(404)
def not_found(error):
    return redirect(url_for("login"))


if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True)
