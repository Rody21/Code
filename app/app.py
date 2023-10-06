from flask import Flask,  render_template, url_for, redirect
from datetime import datetime
from confiDB import *
from dotenv import load_dotenv
from querys import *
from flask_socketio import SocketIO, emit

app = Flask(__name__)

socketio = SocketIO(app)

@app.route('/', methods=['GET','POST'])
def inicio():
    conexion_MySQLdb = connectionBD()
    mycursor = conexion_MySQLdb.cursor(dictionary=True)
    querySQL = (SELECT_ALL)
    mycursor.execute(querySQL)
    data = mycursor.fetchall()
    total = mycursor.rowcount
    mycursor.close()
    conexion_MySQLdb.close()
    print(total)
    return render_template('index.html', dataParking = data, dataTotal = total)


@socketio.on('connect')
def handle_connect():
    print('Cliente conectado')

    
@socketio.on('consulta_base_de_datos')
def consultar_base_de_datos():
    # Realiza una consulta a la base de datos para obtener los nuevos datos
    nuevos_datos = inicio()

    # Emite los nuevos datos a todos los clientes conectados
    emit('actualizar_tabla', nuevos_datos, broadcast=True)


@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('inicio'))

if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
    socketio.run(app)
