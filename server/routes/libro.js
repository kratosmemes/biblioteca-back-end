const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');
const Libro = require('../models/libro');

app.get('/libro', [verificaToken], (req, res) => {
    Libro.find({ disponible: true })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            })
        });
});

app.post('/libro', [verificaToken], (req, res) => {
    let body = req.body;

    let libro = new Libro({
        nombre: body.nombre,
        precioUnitario: body.precioUnitario,
        cantidadPorUnidad: body.cantidadPorUnidad,
        usuario: body.usuario,
        img: body.img

    });

    libro.save((err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });

    });

});


app.put('/libro/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUnitario', 'cantidadPorUnidad', 'usuario', 'disponible', 'img']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.delete('/libro/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Libro.deleteOne({ _id: id }, (err, resp) => {
         if (err) {
           return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Libro no encontrado'
               }
            });
        }
         return res.status(200).json({
            ok: true,
            resp
        });
    });  
});
module.exports = app;