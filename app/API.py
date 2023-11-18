# API para Unity
import string
from flask import Flask, request, jsonify
import random
import json
import pymysql
from config import *


app = Flask(__name__)

# Query para obtener espacios disponibles 

def query_available_parking(connection):
    # Crear un objeto cursor
    cursor = connection.cursor()
    
    # Consulta SQL para obtener espacios de estacionamiento disponibles
    query = "SELECT * FROM PF.Parking2 WHERE valor = 0 AND asignado = 0"
    
    # Ejecutar la consulta
    cursor.execute(query)
    
    # Obtener los resultados
    available_parking = cursor.fetchall()
    
    # Cerrar el cursor
    cursor.close()

    # Retornar los espacios de estacionamiento disponibles
    return available_parking


def update_parking_assignation_status(connection, response_data):

    cursor = connection.cursor()

    piso = response_data['piso']

    posicion = response_data['posicion']

    update_query = f"UPDATE Parking2 SET asignado = 1 WHERE id_sensor = {posicion} AND id_controlador = {piso};"

    cursor.execute(update_query)

    connection.commit()
 
def update_parking_status(connection, id_controlador, lecturas):
    
    cursor = connection.cursor()
    piso = id_controlador
    idSensor = 1;

    for leactura in lecturas:
        valor = lecturas[idSensor-1]
        update_query = f"UPDATE Parking2 SET valor = {valor} WHERE id_sensor = {idSensor} AND id_controlador = {piso};"
        cursor.execute(update_query)
        idSensor+=1

    connection.commit()

# Conectar a la base de datos

db_params = {
    'host': HOST,
    'user': USER,
    'password': PASSWORD,
    'db': DB,
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor,
}

@app.route('/actualizar_estado', methods=['POST'])
def actualizar_estado():
    # Obtener los datos del formulario
    print(request.form)
    dataControlador = request.form    
    controlador = request.form.get('idControlador')
    numeroDeSensores = 34 if controlador=='2' else 38
    lecturas = []
    connection = pymysql.connect(**db_params)


    for idSensor in range(1, numeroDeSensores+1):  # Donde 'n' es el número total de sensores
        valor = dataControlador.get("Sensor" + str(idSensor))
        lecturas.append(valor)
    
    print(lecturas)

    try:
        # Procesar los datos (puedes almacenarlos en una base de datos, por ejemplo)
        # Ejemplo de impresión para verificar en la consola de Flask
        
        # Establecer una conexión a la base de datos

        connection = pymysql.connect(**db_params)
        print("Conexión exitosa!")

        update_parking_status(connection,  controlador, lecturas)

        return jsonify({'mensaje': 'Lectura registrada exitosamente'})

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Error al procesar la solicitud'})  


    finally:
            if 'connection' in locals() and connection.open:
                connection.close()
                print("Conexión cerrada.")
    


@app.route('/get_assigned_position', methods=['GET'])
def get_assigned_position():
    try:
        # Establecer una conexión a la base de datos
        connection = pymysql.connect(**db_params)
        print("Conexión exitosa!")

        # Obtener espacios de estacionamiento disponibles
        available_parking = query_available_parking(connection)

      

        if available_parking:
            # Elegir un lugar de estacionamiento disponible de forma aleatoria
            selected_parking = random.choice(available_parking)
            response_data = {
                'posicion': selected_parking['id_sensor'],
                'piso': selected_parking['id_controlador']
            }
            # TODO: Actualizar el estado del lugar de estacionamiento a "ocupado"
            update_parking_assignation_status(connection, response_data)
            

            return jsonify({'assigned_position': response_data})

        else :
         return jsonify({'message': 'No hay lugares de estacionamiento disponibles'})

    except pymysql.MySQLError as e:
        print(f"Error: {e}")

    finally:
        if 'connection' in locals() and connection.open:
            connection.close()
            print("Conexión cerrada.")



if __name__ == '__main__':
    app.run(debug=True, port=5001)

