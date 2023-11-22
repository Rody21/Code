import csv
import random
import string


# Función para generar placas simuladas con el formato especificado
def generar_placas(num_registros):
    placas = []
    for i in range(num_registros):
        letras = "".join(
            random.choices(string.ascii_uppercase, k=3)
        )  # Generar tres letras aleatorias
        numeros = "".join(
            random.choices(string.digits, k=3)
        )  # Generar tres números aleatorios
        placa = f"{letras}-{numeros}"  # Formato de la placa: tres letras - tres números
        placas.append(placa)
    return placas


# Función para generar datos simulados
def generar_datos_simulados(num_registros):
    datos = []
    placas = generar_placas(num_registros)
    for i in range(num_registros):
        id_tarjeta = f"RFID_{i + 1:03}"  # Generar ID de tarjeta RFID
        usuario_id = random.randint(
            101, 210
        )  # Generar ID de usuario aleatorio entre 101 y 210
        tipo_acceso = random.choice(["Entrada", "Salida"])  # Tipo de acceso aleatorio
        placa = placas[i]  # Obtener la placa correspondiente al índice actual
        datos.append([i + 1, id_tarjeta, usuario_id, tipo_acceso, placa])
    return datos


# Generar datos simulados
registros_simulados = generar_datos_simulados(250)

# Escribir los datos en un archivo CSV
nombre_archivo = "datos_rfid_con_placas.csv"
encabezados = ["ID", "ID_Tarjeta_RFID", "Usuario_ID", "Tipo_Acceso", "Placa_Vehicular"]

with open(nombre_archivo, "w", newline="") as archivo_csv:
    writer = csv.writer(archivo_csv)
    writer.writerow(encabezados)
    writer.writerows(registros_simulados)

print(f"Se han generado exitosamente los datos en el archivo '{nombre_archivo}'.")
