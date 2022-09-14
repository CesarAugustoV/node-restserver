const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req, res = response)=>{

    const {correo, password } = req.body;

    try {
       
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});//buscar en la bd el correo
        if(!usuario){//si es null
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -correo'
            })
        }
       
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -estado:false'
            })
        }
        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password); //compara dos valores devuelve boolean.(si hace match contraseña enviada vs la contraseña de la bd)
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -Password'
            })
        }
        //generar el JWT
        //helpers/generar-jwt.js
        const token = await generarJWT(usuario.id);//guardar en el payload usuario.id
        

        res.json({
            usuario,//usuario autenticado
            token//y el token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}