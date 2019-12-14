const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre de el libro']

    },
    precioUnitario: {
        type: Number,
        required: [true, 'Por favor ingresa el nombre de el precio']

    },
    cantidadPorUnidad: {
        type: Number,
        required: [true, 'Por favor ingresa la antidad por unidad']

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el usuario']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);