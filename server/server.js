require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { mainModule } = require('process');
const { log } = require('./Utils/Utils');

/// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
    });

//Parse aplication/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }));

//Parse formato a aplication/json
app.use(bodyParser.json());

//Archivo agrupador de rutas
app.use(require('./routes/index'));

const serverStart = async () => {
    //Conexion a la base de datos
    log("Starting service initialization")
    log("Trying to connect to the database, please wait...")
    await mongoose.connect(process.env.URLDB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useCreateIndex: true // This line is creating an error
            },
    ).then( async res => {
        log("Database connected successfully")
        //Puerto de escucha de la aplicacion
        await app.listen(process.env.PORT, () => {
        log(`Server is up on port: ${process.env.PORT}`);
    });
    })
    .catch(err => {
        log("It has been an error trying to connect to the Database, please verify your conections and configurations");
    });
}

serverStart();