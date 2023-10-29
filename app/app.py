from flask import Flask, render_template, url_for, redirect, jsonify, Response, session, request
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from confiDB import *
from dotenv import load_dotenv
from querys import *


app = Flask(__name__)

app.secret_key = '36e42c5ca26b572eef30e0573a6701614eb86e828bf60d9c41b5edfcc50b8dad'

# Función para realizar la consulta a la base de datos y actualizar los datos
def actualizar_datos(query, data_key):
    conexion_MySQLdb = connectionBD()
    mycursor = conexion_MySQLdb.cursor(dictionary=True)
    mycursor.execute(query)
    print(query)
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
programador6 = configurar_programador(ASIGNACION, 10, 'asignacion')

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/login', methods = ['GET', 'POST'])
def login():
    
    if request.method == 'POST' and 'usuario' in request.form and 'password':
        _username = request.form['usuario']
        _password = request.form['password']
        
        conexion_User = connectionBD()
        mycursor = conexion_User.cursor()
        mycursor.execute('SELECT * FROM Usuarios WHERE username = %s AND password = %s', (_username,_password,))
        data_U = mycursor.fetchone()
        
        if data_U:
            session['logueado'] = True
            session['id'] = data_U[0]
            session['id_rol'] = data_U[4]
            
            if session['id_rol'] == 1:
                return redirect(url_for('Piso1'))
            elif session['id_rol'] == 2:
                return redirect(url_for('Usuario'))
        else:
            return render_template('index.html')
    
    return render_template('index.html')


@app.route('/actualizar_asignado', methods=['POST'])
def actualizar_asignado():
    query_sql = request.get_data().decode('utf-8')
    # Ejecuta el query SQL en la base de datos
    try:
        print(query_sql)
        conexion_MySQLdb = connectionBD()
        mycursor = conexion_MySQLdb.cursor(dictionary=True)
        mycursor.execute(query_sql)
        mycursor.close()
        conexion_MySQLdb.close()
        
        return "Actualización de la base de datos exitosa"
    except Exception as e:
        return "Error en la actualización de la base de datos: " + str(e), 500
    

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

@app.route('/get_data_Usuario')
def get_data_Usuario():
    data = app.config.get('asignacion', [])
    return jsonify(data)

@app.route('/Page1')
def Piso1():
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

@app.route('/Usuario')
def Usuario():
    return render_template("Usuario.html")

# Manejo de errores 404
@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('login'))

if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
