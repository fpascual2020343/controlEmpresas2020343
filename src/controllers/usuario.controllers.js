const Usuario = require('../models/usuario.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function registrarAdminDefault(req, res) {

    var modeloUsuario = new Usuario();

        Usuario.find({email: "Admin"}, (err, existente) => {

            if ( existente.length > 0 ){ 
                console.log("El  admin ya esta registrado");
            } else {

                modeloUsuario.usuario = 'Admin';
                modeloUsuario.rol = 'Admin';
            
                bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {

                    modeloUsuario.password = passwordEncriptada;
    
                    modeloUsuario.save((err, usuarioGuardado)=>{
    
                        if(err) console.log("Error en la peticion")
                        if(!usuarioGuardado) console.log("Error al guardar el admin");
    
                        console.log({Usuario: usuarioGuardado});
                    })
                })
                }

        })

}

function Login(req, res) {

    var parametros = req.body;

    Usuario.findOne({ usuario : parametros.usuario }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({token: jwt.crearToken(usuarioEncontrado)})
                    } else {
                        return res.status(500).send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500).send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}


function agregarEmpresa(req, res){

    var parametros = req.body;
    var modeloUsuario = new Usuario;

    if(parametros.usuario && parametros.password && parametros.empresa){

        Usuario.find({empresa: parametros.empresa}, (err, empresaEncontrada) => {

            if ( empresaEncontrada.length > 0 ){ 
                return res.status(500).send({ mensaje: "Este empresa ya se encuentra utilizado" })
            } else {

                modeloUsuario.usuario = parametros.usuario;
                modeloUsuario.rol = 'Empresa';
                modeloUsuario.empresa = parametros.empresa;

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) =>{

                    modeloUsuario.password = passwordEncriptada;

                    modeloUsuario.save((err, empresaGuardada) => {

                        if(err) return res.status(500).send({ mensaje : 'Error en la peticion' });

                        if(!empresaGuardada) return res.status(500).send({ mensaje: 'Error al guardar la empresa' })
    
                        return res.status(200).send({ usuario: empresaGuardada})

                    })

                })

            }
        })
    } else {
        return res.status(404).send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }


}

function editarEmpresa(req, res) {

    var idUser = req.params.idUsuario;
    var parametros = req.body;

    delete parametros.rol;
    delete parametros.password;

    Usuario.findByIdAndUpdate(idUser, parametros, {new: true}, (err, empresaEditada) => {

        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!empresaEditada) return res.status(500).send({ mensaje: "Error al editar la Empresa"});

        return res.status(200).send({usuario: empresaEditada});

    
    })

}

function eliminarEmpresa (req, res) {

    var idUser = req.params.idUsuario;

    Usuario.findByIdAndDelete(idUser, (err, empresaEliminada)=>{

        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!empresaEliminada) return res.status(500).send({ mensaje: "Error al eliminar el Usuario"});

        return res.status(200).send({usuario: empresaEliminada});

    })

}

module.exports = {
    registrarAdminDefault,
    Login,
    agregarEmpresa,
    editarEmpresa,
    eliminarEmpresa
}