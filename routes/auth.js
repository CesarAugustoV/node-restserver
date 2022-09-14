const { Router } = require('express');//del paquete de express requerimos la funcion router
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');


const router = Router(); //llamamos la funcion.

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login );


module.exports = router;