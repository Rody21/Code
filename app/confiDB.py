import os
import mysql.connector
from config import *

def connectionBD():
    mydb = mysql.connector.connect(
        host = HOST,
        user = USER,
        passwd = PASSWORD,
        database = DB
    )
    if mydb:
        print("Conexion exitosa")
    else:
        print("Error en la conexion")
        
    return mydb