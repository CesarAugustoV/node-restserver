const {validationResult} = require('express-validator');

const validarCampos = ( req, res, next ) =>{

    //funcion de expressvalidation para guardar errores
      const errors = validationResult(req);//enviamos la request
      //validar si hay errores
      if(!errors.isEmpty()) {//isEmpty() si no hay errores, negacion si hay errores
        return res.status(400).json(errors);
      }


      next();

}


module.exports = {
    validarCampos
}