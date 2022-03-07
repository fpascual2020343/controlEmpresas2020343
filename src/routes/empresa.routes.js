const express = require('express');
const controladorEmpresa = require('../controllers/empresa.controllers');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/auteticacion');
const md_roles = require('../middlewares/rol');

const api = express.Router();

api.post('/agregarEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.agregarEmpleado);
api.put('/editarEmpleado/:idEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.editarEmpleado);
api.delete('/eliminarEmpleado/:idEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.eliminarEmpleado);
//Asignacion de empleados a departamento y puesto
api.post('/asignarEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.agregarPuestoyDepartamentoAEmpleado);
//Busquedas
api.get('/obtenerEmpleados', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.obtenerEmpleadosEmpresa);
api.get('/buscarEmpleadoPorId/:idEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.obtenerEmpleadoPorId);
api.get('/obtenerEmpleadosPorDepartamento', [md_autenticacion.Auth, md_roles.verEmpresa], 
        controladorEmpresa.obtenerEmpleadoPorDepartamento);
api.get('/obtenerEmpleadosPorPuesto', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresa.obtenerEmpleadoPorPuesto);

module.exports = api;