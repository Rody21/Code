import random
import time
from config import *
import pymysql

db_params = {
    'host': HOST,
    'user': USER,
    'password': PASSWORD,
    'db': DB,
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor,
}

# Función para conectar a la base de datos MySQL
def connect_to_database():
    conn = pymysql.connect(**db_params)
    return conn

# Función para actualizar el registro con el query proporcionado
def update_random_records_group(conn, num_queries):
    cursor = conn.cursor()
    
    for _ in range(num_queries):
        # Generar números aleatorios para y, z y x
        y = random.randint(1, 5)
        z = random.randint(1, 38)
        x = random.randint(0, 1)
        
        # Ejecutar el query con los valores aleatorios
        query = f"UPDATE PF.Parking SET valor={x} WHERE id_controlador={y} AND id_sensor={z}"
        cursor.execute(query)
        conn.commit()

        print(f"Se actualizó el registro con id_controlador={y}, id_sensor={z}, y valor={x}")

# Función principal
def main():
    conn = connect_to_database()

    while True:
        # Generar un número aleatorio de queries para cada grupo (entre 5 y 20)
        num_queries = random.randint(5, 20)
        update_random_records_group(conn, num_queries)
        
        # Tiempo aleatorio entre grupos de queries (entre 1 y 20 segundos)
        time.sleep(random.uniform(10, 200))

    conn.close()

if __name__ == "__main__":
    main()
