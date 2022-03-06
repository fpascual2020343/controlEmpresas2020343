const express = require('express');
const controladorUsuario =require('../controllers/usuario.controllers');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/auteticacion');
const md_roles = require('../middlewares/rol');

//RUTAS
const api = express.Router();

api.post('/login', controladorUsuario.Login);
api.post('/agregarEmpresa', [md_autenticacion.Auth, md_roles.verAdmin], controladorUsuario.agregarEmpresa);
api.put('/editarEmpresa/:idUsuario', [md_autenticacion.Auth, md_roles.verAdmin], controladorUsuario.editarEmpresa);
api.delete('/eliminarEmpresa/:idUsuario', [md_autenticacion.Auth, md_roles.verAdmin], controladorUsuario.eliminarEmpresa);

module.exports = api;