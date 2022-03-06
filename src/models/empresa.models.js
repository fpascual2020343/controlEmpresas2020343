const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({

    puesto: String,
    departamento: String,
    idEmpleado: {type: Schema.Types.ObjectId, ref: "Empleados"},
    idEmpresa: {type: Schema.Types.ObjectId, ref: "Usuarios"}

})

module.exports = mongoose.model('Empresas', empresaSchema);