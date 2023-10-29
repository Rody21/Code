from werkzeug.security import check_password_hash

# Recupera la contraseña almacenada en la base de datos
hashed_password_from_db = "scrypt:32768:8:1$q1dR94NhXtbDpt54$1206b8363f6aed1aacc4a8db17e2134ca5cd7824386e446a382f0cf9792d4d102b0931e1d934ef838e684f372c1fd2f2c98f72cfd51d537469344bd321a3acb0"

# Contraseña proporcionada por el usuario
user_provided_password = "1234"

# Verifica la contraseña
if check_password_hash(hashed_password_from_db, user_provided_password):
    # La contraseña es válida
    print("Contraseña válida")
else:
    # La contraseña no es válida
    print("Contraseña inválida")

