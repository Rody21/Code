import os
import mysql.connector

def connectionBD():
    mydb = mysql.connector.connect(
        host = "database-1.c4zfdvzds5m5.us-east-1.rds.amazonaws.com",
        user = "admin",
        passwd = "Lolipop23",
        database = "PF"
    )
    if mydb:
        print("Conexion exitosa")
    else:
        print("Error en la conexion")
        
    return mydb