const { Router } = require('express');//del paquete de express requerimos la funcion router
const { check } = require('express-validator');


const {validarCampos, 
        validarJWT, 
        esAdminRole, 
        tieneRole} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosDelete,
        usuariosPut,
        usuariosPost,
        usuariosPatch } = require('../controllers/usuarios');


const router = Router(); //llamamos la funcion.

// las rutas:
//al router le configuramos las rutas.
//tipo de peticion y respuesta segun controlador.


//GET
router.get('/', usuariosGet);


//PUT
router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),//es un mongo id?
        check('id').custom(existeUsuarioPorId),//DB-VALIDATOR
        check('rol').custom(esRoleValido),
        validarCampos

], usuariosPut)//obtener el valor enviado a traves del url. localhost/api/usuarios/"valor-enviado"


//POST
//para los middleware se añaden en el segundo argumento.
router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),//usamos not() para negacion, is empty tiene que estar vacio.
        check('password', 'El password debe de ser mas de 6 digitos.').isLength({min:6}),
        check('correo', 'El correo no es valido').isEmail(), //usamos la funcion de express validator, check
        check('correo').custom(emailExiste),
        check('rol').custom(esRoleValido),//es lo mismo que..custom((rol)=>esRoleValido(rol))
        validarCampos
], usuariosPost)


//DELETE
router.delete('/:id',[
        validarJWT,//validar jwt si da error no sigue con el resto, middleware
        // esAdminRole,//validar rol de usuario,middleware
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),//es un mongo id?
        check('id').custom(existeUsuarioPorId),//DB-VALIDATOR
        validarCampos
], usuariosDelete)


//PATCH
router.patch('/', usuariosPatch)





module.exports = router;