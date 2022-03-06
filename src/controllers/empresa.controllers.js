const empresa = require('../models/empresa.models');

function agregarEmpleado(req, res){
    const parametros = req.body;
    const modeloEmpresa = new empresa();

            if(parametros.nombre && parametros.email && parametros.puesto && parametros.departamento){

                modeloEmpresa.nombre = parametros.nombre;
                modeloEmpresa.apellido = parametros.apellido;
                modeloEmpresa.email = parametros.email;
                modeloEmpresa.telefono = parametros.telefono;
                modeloEmpresa.departamento = parametros.departamento;
                modeloEmpresa.puesto = parametros.puesto;
                modeloEmpresa.idEmpresa = req.user.sub;
        
                modeloEmpresa.save((err, empleadoGuardado) => {
                    if(err) return res.status(400).send({ mensaje: 'Erorr en la peticion.' });
                    if(!empleadoGuardado) return res.status(400).send({ mensaje: 'Error al agregar al empleado.'});
        
                    return res.status(200).send({ empresa: empleadoGuardado });
                })
        
            }else {
                return res.status(400).send({ mensaje: 'Debe enviar los parametros obligatorios.' })
            }

}

function editarEmpleado (req, res) {

    var parametros = req.body;
    var idEmpleado = req.params.idEmpleado;

    empresa.findOne({_id: idEmpleado, idEmpresa: req.user.sub},(err, empleadoD) => {

        if(!empleadoD){
            return res.status(400).send({ mensaje: 'No puede editar empleados que no son de su empresa'});
        } else {

            empresa.findByIdAndUpdate(idEmpleado, parametros, {new : true}, (err, empleadoEditado) => {
                if(err)return res.status(500).send({mensaje: 'Error en la petición'});
                if(!empleadoEditado)return res.status(404).send({mensaje: 'Error al editar el curso'});
    
                return res.status(200).send({empresa: empleadoEditado});
            })

        }

    })
}

function eliminarEmpleado(req, res){

    var idEmpleado = req.params.idEmpleado;


    empresa.findOne({_id: idEmpleado, idEmpresa: req.user.sub},(err, empleadoD) => {

        if(!empleadoD){
            return res.status(400).send({ mensaje: 'No puede eliminar empleados que no son de su empresa'});
        } else {

            empresa.findByIdAndDelete(idEmpleado, (err, empleadoEmpleado) => {
                if(err)return res.status(500).send({mensaje: 'Error en la petición'});
                if(!empleadoEmpleado)return res.status(404).send({mensaje: 'Error al eliminar el empleado'});
    
                return res.status(200).send({empresa: empleadoEmpleado});
            })

        }

    })

}


//Busquedas 

function obtenerEmpleados(req, res) {

    empresa.find( (err, empleadosEncontrados) => {

        if(err) return res.status(500).send({ mensaje: 'Error en la Peticion'});
        if(!empleadosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los empleados'});

        return res.status(200).send({empleados: empleadosEncontrados});
    })
}


module.exports = {
    agregarEmpleado,
    editarEmpleado,
    eliminarEmpleado,

    obtenerEmpleados
}