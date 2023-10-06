import os
import mysql.connector

def connectionBD():
    mydb = mysql.connector.connect(
        host = os.getenv("HOST"),
        user = os.getenv("USER"),
        passwd = os.getenv("PASSWORD"),
        database = os.getenv("DB")
    )
    if mydb:
        print("Conexion exitosa")
    else:
        print("Error en la conexion")
        
    return mydb