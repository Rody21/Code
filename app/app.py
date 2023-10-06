from flask import Flask,  render_template, url_for, redirect
from datetime import datetime
from confiDB import *
from dotenv import load_dotenv
from querys import *

app = Flask(__name__)

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


@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('inicio'))

if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
