const empresa = require('../models/empresa.models');
const empleado = require('../models/empleado.models');

function agregarEmpleado(req, res){
    const parametros = req.body;
    const modeloEmpleado = new empleado();

            if(parametros.nombre && parametros.correo){

                modeloEmpleado.nombre = parametros.nombre;
                modeloEmpleado.apellido = parametros.apellido;
                modeloEmpleado.correo = parametros.correo;
                modeloEmpleado.telefono = parametros.telefono;
                modeloEmpleado.idEmpresa = req.user.sub;
        
                modeloEmpleado.save((err, empleadoGuardado) => {
                    if(err) return res.status(400).send({ mensaje: 'Erorr en la peticion.' });
                    if(!empleadoGuardado) return res.status(400).send({ mensaje: 'Error al agregar al empleado.'});
        
                    return res.status(200).send({ cursos: empleadoGuardado });
                })
        
            }else {
                return res.status(400).send({ mensaje: 'Debe enviar los parametros obligatorios.' })
            }

}

function editarEmpleado (req, res) {

    var parametros = req.body;
    var idEmpleado = req.params.idEmpleado;

    empleado.findOne({_id: idEmpleado, idEmpresa: req.user.sub},(err, empleadoD) => {

        if(!empleadoD){
            return res.status(400).send({ mensaje: 'No puede editar empleados que no son de su empresa'});
        } else {

            empleado.findByIdAndUpdate(idEmpleado, parametros, {new : true}, (err, empleadoEditado) => {
                if(err)return res.status(500).send({mensaje: 'Error en la petición'});
                if(!empleadoEditado)return res.status(404).send({mensaje: 'Error al editar el curso'});
    
                return res.status(200).send({empleado: empleadoEditado});
            })

        }

    })
}

function eliminarEmpleado(req, res){

    var idEmpleado = req.params.idEmpleado;


    empleado.findOne({_id: idEmpleado, idEmpresa: req.user.sub},(err, empleadoD) => {

        if(!empleadoD){
            return res.status(400).send({ mensaje: 'No puede eliminar empleados que no son de su empresa'});
        } else {

            empleado.findByIdAndDelete(idEmpleado, (err, empleadoEmpleado) => {
                if(err)return res.status(500).send({mensaje: 'Error en la petición'});
                if(!empleadoEmpleado)return res.status(404).send({mensaje: 'Error al eliminar el empleado'});
    
                return res.status(200).send({empleado: empleadoEmpleado});
            })

        }

    })

}

function agregarPuestoyDepartamentoAEmpleado(req, res) {

    var parametros = req.body;
    var empresaLogeada = req.user.sub;

    empleado.findOne({idEmpresa: req.user.sub}, (err, empleadoDi) => {

        if(!empleadoDi){
            return res.status(400).send({ mensaje: 'No puede asignar empleados que no son de su empresa'});
        } else {

            if(parametros.puesto && parametros.departamento){
        
                    empleado.findOne({nombre: parametros.nombre}, {apellido: parametros.apellido}, (err, empleadoEncontrado) =>{
        
                        if(err) return res.status(400).send({ mensaje: 'Erorr en la peticion de obtener empleado'});
                        if(!empleadoEncontrado) return res.status(400).send({ mensaje: 'Error al obtener el empleado'});
        
                        var modeloEmpresa = new empresa();
        
                        modeloEmpresa.idEmpleado = empleadoEncontrado._id;
                        modeloEmpresa.idEmpresa = empresaLogeada;
        
                        modeloEmpresa.save((err, empleadoAsignado) => {
                            if(err) return res.status(400).send({ mensaje: 'Error en la peticion de agregar empleado' });
                            if(!empleadoAsignado) return res.status(400).send({ mensaje: 'Error al agregar empleado'});
        
                            return res.status(200).send({ empleado: empleadoAsignado})
                        })
                    })     
            } else {
                return res.status(400).send({ mensaje: 'Debe enviar los parametros obligatorios.'});
            }
        }
    })
}





module.exports = {
    agregarEmpleado,
    editarEmpleado,
    eliminarEmpleado,
    agregarPuestoyDepartamentoAEmpleado
}