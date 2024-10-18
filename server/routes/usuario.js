const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');
const Usuario = require('../models/usuario');
const { VerifyDbStatus } = require('../middlewares/database_status_verify');
const { log, JsonFieldIsUndefined, VerificaJson } = require('../Utils/Utils');

app.get('/usuario', [verificaToken], (req, res) => {
    let desde = req.params.desde || 0;
    desde = Number(desde);

    let limite = req.params.limite || 0;
    limite = Number(limite);
    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.usuario);
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            })
        });
});

app.put('/usuario/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'apellido', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.delete('/usuario/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Usuario.deleteOne({ _id: id }, (err, resp) => {
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
                    msg: 'Usuario no encontrado'
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