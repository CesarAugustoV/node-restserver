const {response} = require('express');

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre } = req.usuario;

    if (rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto.`
        })
    }

    next();
}
//RECIBIR ARGUMENTOS EN MIDDLEWARE
const tieneRole = (...roles)=>{//usamos rest
    return (req, res=response, next)=>{//ejecutamos una funcion al hacer el return con los argumentos middleware

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();

    }

}

module.exports = {
    esAdminRole,
    tieneRole
}