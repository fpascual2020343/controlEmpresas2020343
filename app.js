const express = require('express');
const app = express();
const cors = require('cors');

// IMPORTACION RUTAS
const usuarioRoutes = require('./src/routes/usuario.routes');
const empresaRoutes = require('./src/routes/empresa.routes')

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/controlEmpresas
app.use('/api', usuarioRoutes, empresaRoutes);


module.exports = app;