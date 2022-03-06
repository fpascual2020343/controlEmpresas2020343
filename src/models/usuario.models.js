const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

    usuario: String,
    password: String,
    rol: String,
    empresa: String

})

module.exports = mongoose.model('Usuarios',usuarioSchema);