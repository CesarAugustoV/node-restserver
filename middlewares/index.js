const validaRoles = require('../middlewares/validar-roles');
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');



module.exports = { //exporta todo lo que se recibe del path
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}