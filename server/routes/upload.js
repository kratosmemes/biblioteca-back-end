const express = require('express');
const fileUpload = require('express-fileupload'); //npm install --save express-fileupload
const uniqid = require('uniqid');//npm i uniqid --save
const path = require('path');
const fs = require('fs');
const app = express();

const Libro = require('../models/libro');
const Prestamo = require('../models/prestamo');

app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name);

    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    let validExtensions = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];

    if(!validExtensions.includes(archivo.mimetype)){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Solo las extensiones <png, jpg, gif, jpeg>'
            }
        });
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err                                                                                            
            });
        }
    });

    switch(ruta){
        case 'prestamo':
            imagenPrestamo(id, res, nombre)
        break;

        case 'libro':
            imagenLibro(id, res, nombre)
        break;

        default:

        return res.status(400).json({
            ok: false,
            err: {
                message: 'Ruta no valida'
            }
        });
        break;
    }

});

function imagenLibro(id, res, nombreImagen){
    Libro.findById(id, (err, lib) => {
        if(err){
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!lib){
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Libro no existe'
                }
            });
        }

        lib.img = nombreImagen;

        lib.save((err, libDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'libro');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok:true,
                libDB
            });
        });


    });
}

function imagenProducto(id, res, nombreImagen){
    Prestamo.findById(id, (err, pre) => {
        if(err){
            borrarArchivo(nombreImagen, 'prestamo');
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!pre){
            borrarArchivo(nombreImagen, 'prestamo');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }

        pre.img = nombreImagen;

        pre.save((err, preDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'prestamo');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok:true,
                preDB
            });
        });


    });
}

function borrarArchivo(nombreImagen, ruta){
    let pathimg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);

    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);
    }

    console.log('Imagen borrada con exito');
}

module.exports = app;