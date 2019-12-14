const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    apellido: {
        type: String,
        required: [true, 'Por favor ingresa el apellido del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el correo electronico']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']

    },
    role: {
        type: String,
        required: [true, 'Por favor ingresa  el rol de usuario']
    },
    estado: {
        type: Boolean,
        default: true
    }


});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);