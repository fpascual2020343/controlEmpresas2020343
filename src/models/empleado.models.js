const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadosSchema = new Schema({

    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    idEmpresa: {type: Schema.Types.ObjectId, ref: "Usuarios"}
})

module.exports = mongoose.model('Empleados', empleadosSchema);