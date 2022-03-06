const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({

    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    puesto: String,
    departamento: String,
    idEmpresa: {type: Schema.Types.ObjectId, ref: "Usuarios"}
})

module.exports = mongoose.model('Empresas', empresaSchema);