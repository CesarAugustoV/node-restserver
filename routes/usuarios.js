const { Router } = require('express');//del paquete de express requerimos la funcion router

const { usuariosGet, 
        usuariosDelete,
        usuariosPut,
        usuariosPost,
        usuariosPatch } = require('../controllers/usuarios');


const router = Router(); //llamamos la funcion.

// las rutas:
//al router le configuramos las rutas.
//tipo de peticion y respuesta segun controlador.

router.get('/', usuariosGet);

router.put('/:id', usuariosPut)//obtener el valor enviado a traves del url. localhost/api/usuarios/"valor-enviado"

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)





module.exports = router;