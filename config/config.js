//PUERTO
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// CONEXION A LA BASE DE DATOS
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/bibliotecaLaEsperanza';
}else{
    urlDB = 'mongodb+srv://admin:admin@cluster0-xqiuj.mongodb.net/test?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;

//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';