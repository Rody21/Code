from flask import Flask, render_template, url_for, redirect, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from confiDB import *
from dotenv import load_dotenv
from querys import *

app = Flask(__name__)

# Función para realizar la consulta a la base de datos y actualizar los datos
def actualizar_datos():
    conexion_MySQLdb = connectionBD()
    mycursor = conexion_MySQLdb.cursor(dictionary=True)
    querySQL = SELECT_FOOT1
    mycursor.execute(querySQL)
    data = mycursor.fetchall()
    total = mycursor.rowcount
    mycursor.close()
    conexion_MySQLdb.close()
    print(f"Actualización de datos a las {datetime.now()}: {total} registros")
    app.config['dataParking'] = data
    app.config['dataTotal'] = total

# Configuración de la tarea programada para actualizar datos cada 2 segundos
scheduler = BackgroundScheduler()
scheduler.add_job(actualizar_datos, 'interval', seconds=10)
scheduler.start()

# Ruta principal que muestra los datos almacenados en la configuración de la aplicación
@app.route('/', methods=['GET', 'POST'])
def inicio():
    data = app.config.get('dataParking', [])
    total = app.config.get('dataTotal', 0)
    return render_template('Foot1.html', dataParking=data, dataTotal=total)

@app.route('/get_data')
def get_data():
    data = app.config.get('dataParking', [])
    return jsonify(data)

@app.route('/Page1')
def otra_pagina():
    return render_template("Foot1.html")

# Manejo de errores 404
@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('inicio'))

if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
