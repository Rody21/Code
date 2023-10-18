from flask import Flask, render_template, url_for, redirect, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from confiDB import *
from dotenv import load_dotenv
from querys import *

app = Flask(__name__)

# Función para realizar la consulta a la base de datos y actualizar los datos
def actualizar_datos(query, data_key):
    conexion_MySQLdb = connectionBD()
    mycursor = conexion_MySQLdb.cursor(dictionary=True)
    mycursor.execute(query)
    data = mycursor.fetchall()
    total = mycursor.rowcount
    mycursor.close()
    conexion_MySQLdb.close()
    print(f"Actualización de datos a las {datetime.now()}: {total} registros")
    app.config[data_key] = data

def configurar_programador(query, intervalo, data_key):
    scheduler = BackgroundScheduler()
    scheduler.add_job(lambda: actualizar_datos(query, data_key), 'interval', seconds=intervalo)
    scheduler.start()
    return scheduler

programador1 = configurar_programador(SELECT_FOOT1, 10, 'dataParking1')
programador2 = configurar_programador(SELECT_FOOT2, 10, 'dataParking2')
programador3 = configurar_programador(SELECT_FOOT3, 10, 'dataParking3')
programador4 = configurar_programador(SELECT_FOOT4, 10, 'dataParking4')
programador5 = configurar_programador(SELECT_FOOT5, 10, 'dataParking5')

# Ruta principal que muestra los datos almacenados en la configuración de la aplicación
@app.route('/', methods=['GET', 'POST'])
def inicio():
    data = app.config.get('dataParking1', [])
    total = app.config.get('dataTotal1', 0)
    return render_template('Foot1.html', dataParking=data, dataTotal=total)

@app.route('/get_data_1')
def get_data_1():
    data = app.config.get('dataParking1', [])
    return jsonify(data)

@app.route('/get_data_2')
def get_data_2():
    data = app.config.get('dataParking2', [])
    return jsonify(data)

@app.route('/get_data_3')
def get_data_3():
    data = app.config.get('dataParking3', [])
    return jsonify(data)

@app.route('/get_data_4')
def get_data_4():
    data = app.config.get('dataParking4', [])
    return jsonify(data)

@app.route('/get_data_5')
def get_data_5():
    data = app.config.get('dataParking5', [])
    return jsonify(data)

@app.route('/Page1')
def otra_pagina():
    return render_template("Foot1.html")

@app.route('/Page2')
def Piso2():
    return render_template("Foot2.html")

@app.route('/Page3')
def Piso3():
    return render_template("Foot3.html")

@app.route('/Page4')
def Piso4():
    return render_template("Foot4.html")

@app.route('/Page5')
def Piso5():
    return render_template("Foot5.html")

# Manejo de errores 404
@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('inicio'))

if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
