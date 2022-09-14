const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



const validarJWT = async (req = request, res = response, next)=>{

    const token = req.header('x-token'); //de la request.header extrae x-token

    //si no viene el token
    if(!token){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        });
    }

    //validacion del jwt
    try {
        //validar el jwt si no ha sido manipulado, jwt.verify del paquete jwt. extrae el uid que viene en el jwt
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);//enviamos el token y la semilla

        //leer modelo, usuario al uid.
        const usuario = await Usuario.findById(uid);

        if(!usuario){//no existe el usuario
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        //verificar si el uid tiene edo en true
        if(!usuario.estado){
            return res.status(401).json({
                msg:'token no valido - usuario edo false'
            })

        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    next();

}

module.exports = {
    validarJWT
}