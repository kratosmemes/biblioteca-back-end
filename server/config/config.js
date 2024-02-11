//PUERTO
process.env.PORT = 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// CONEXION A LA BASE DE DATOS
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/library';
}

process.env.URLDB = urlDB;

//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '1h';