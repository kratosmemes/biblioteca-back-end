const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    cliente: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del cliente']
    },
    telefono: {
        type: Number,
        unique: true,
        required: [true, 'Por favor ingresa el telefono del cliente']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Por favor ingresa el id del libro']
    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor ingresa la cantidad de libro']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el id del usuario']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);