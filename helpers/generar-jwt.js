const jwt = require('jsonwebtoken');



//jwt trabaja en base a promesas.

const generarJWT = (uid = '')=>{//recibe useridentifier del usuario

    return new Promise((resolve, reject)=>{

        const payload = {uid};

        //generar JWT
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {//solicita el payload, una clave que es la firma del token.
            expiresIn: '4h'//tiempo que expira el token
        }, (err, token)=>{//callback
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })



    })
}


module.exports = {
    generarJWT
}