'use strict'

let express = require('express');

let app = express();

// ARCHIVOS DE RUTAS
let projectRoutes = require('./routes/project');

// MIDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// RUTAS
app.use('/api', projectRoutes)

// EXPORTAR
module.exports = app;