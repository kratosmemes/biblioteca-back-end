const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const User = require('../models/usuario');
const userCtrl = {};

const { log, JsonFieldIsUndefined, VerificaJson } = require('../Utils/Utils');

userCtrl.loginFunction = async(req, res) => {

    log("Starting 'loginFunction' method to authenticate a user.");

    try {
        const body = req.body;
        const usuarioDB = await User.findOne({ email: body.email});

        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User and/or password are incorrect"
                }
            })
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User and/or password are incorrect"
                }
            })
        }

        const token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
};

userCtrl.registerFunction = async(req, res) => {
    
    let body = req.body;

    log("Starting 'registerFunction' method to create a new user.");

    if (!body.nombre || !body.apellido || !body.email || !body.password) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            error: "All fields are required.",
        });
    }

    let newUser = new User({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    try {
        const saveUserResponse = await newUser.save()
        log(saveUserResponse)

        if(!saveUserResponse){
            if(JsonFieldIsUndefined(err)){
                res.status(500).json({
                    status: "Error",
                    code: 500,
                });
            }else{
                res.status(400).json({
                    status: "Error",
                    code: 400,
                    error: "The email must be diferent and unique",
                    type: "UniqueValidator",
                });
            }
        } else {
            log("User has been created.");
            log(success);
            res.status(200).json({
                status: "OK",
                code: 200,
                user: newUser,
            });
        }
    } catch(err) {
        log("There has been an error when trying to create user.");
        log(err)
        return res.status(500).json({
            ok: false,
            err
        });
    }
}

module.exports = userCtrl