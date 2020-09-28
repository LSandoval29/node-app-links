//Importar BYCRYPT para cifrar la contraseña
const bcrypt = require('bcryptjs')

const helpers = {}

//Cuando se registre el usuario
helpers.encryptPassword = async (password) => {//Funcion que encryptara la contraseña recibida

    const salt = await bcrypt.genSalt(10)//Genera un hash ejecutandolo 10 veces entre mas veces se ejecute mas seguro sera el cifrado
    const finalPassword = await bcrypt.hash(password, salt)//Este metodo es el que cifrara la password
    return finalPassword

}

//Cuando se logue el usuario
helpers.matchPassword = async (password, savedPassword) =>{
    
    return await bcrypt.compare(password, savedPassword)//Este metodo compara la contraseña en texto plano con la que esta almacenada en la bdd

}

module.exports = helpers