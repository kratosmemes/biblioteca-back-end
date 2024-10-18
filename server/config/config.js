//PUERTO
process.env.PORT      = 3000;
const DB_USERNAME     = 'admin'
const DB_PASSWORD     = '123'
const DB_NAME         = 'library'

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// CONEXION A LA BASE DE DATOS
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/${DB_NAME}?authSource=admin`;
}else {
    //TODO
}

process.env.URLDB = urlDB;

//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '1h';