'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let port = 3700;

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(() => {
            console.log('Conexion establecida');

            // CREANDO SERVIDOR
            app.listen(port, () => 
                {console.log('Servidor corriendo correctamente en localhost:3700');
            });

        }).catch(error => {
            console.log(error);
        });