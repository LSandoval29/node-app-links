const mysql = require('mysql')//Requerimos el modulo mysql
const { promisify } = require('util')
const { database } = require('./keys')//Requerimos el archivo keys usando destructuring

const pool = mysql.createPool(database)//Usaremos pool para conectarnos a mysql

pool.getConnection((error, connection) => {
    if(error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTION')
        }
        if(error.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSES')
        }
    }
    //Si no hay errores:
    if(connection) connection.release()
    console.log('DB IS CONNECTED')
    return;

})

//Promisify pool querys
pool.query = promisify(pool.query)//Esto sirve para poder realizar consultas usando promesas
module.exports = pool;//Exportamos pool para poder hacer las consultas.


