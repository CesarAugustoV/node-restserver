const { response } = require('express');//extraemos de express response, para tener mejor tipado.

//controladores
//GET
const usuariosGet = (req = request, res = response) => {//aqui es comos si llamaramos a app.get(...)
  //localhost:8080/api/usuarios?q=hola&apikey=1231523
  //extraemos y desestructuramos req.query
  const {q, nombre = "no name", apikey, page = 1, limit} = req.query; 
    
    res.json({//respondemos en formato json.
        msg: "Get API - usuariosGet",
        q,
        nombre,
        apikey,
        page,
        limit
    })
  };

//POST
  const usuariosPost = (req, res=response) => {
      //obtener datos del body de un post
      const {nombre, edad} = req.body;//desestructuramos el body enviado a traves del metodo post, extraemos nombre y edad.
          
      res.status('201').json({
          msg: "Post API - usuariosPost",
          nombre,//mostramos el nombre y edad por msg json.
          edad
      })
    }

    //PUT
const usuariosPut = (req, res=response) => {
  
  //el dato obtenido a traves de la ruta, viene en la request.params.
  const {id} = req.params;
    
    
    res.status('200').json({
        msg: "Put API - usuariosPut",
        id
    })
  }
//DELETE
  const usuariosDelete = (req, res=response) => {
    res.json({
        msg: "Delete API - usuariosDelete"
    })
  }
//PATCH
  const usuariosPatch = (req, res=response) => {
    res.status('500').json({
        msg: "Patch API - usuariosPatch"
    })
  }



  module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
  };