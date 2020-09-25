const { format } = require('timeago.js')

const helpers = {}

helpers.timeago = (timestamp) => {//El timestamp sera tomado desde la vista

    return format(timestamp)//Retornamos el formato de la fecha recibida

}

module.exports = helpers