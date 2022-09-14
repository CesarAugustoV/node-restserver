const { response } = require('express');//extraemos de express response, para tener mejor tipado.
const bcryptjs = require('bcryptjs'); //encriptar contraseña

const Usuario = require('../models/usuario');//requerimos la clase Usuario

//controladores

//GET
const usuariosGet = async(req = request, res = response) => {

  // const {q, nombre = "no name", apikey, page = 1, limit} = req.query; 
    const {limite=5, desde = 0} = req.query;
    const query = {estado:true};
    //se coloca el await para que se detenga el codigo hasta que se ejecuten ambas promesas
    const [total, usuarios] = await Promise.all([//simplificar el codigo con promise.all para lanzar ambas promesas simultaneamente
      Usuario.countDocuments(query),
      Usuario.find(query)//retorna usuarios en estado true
      .skip(Number(desde))//transformamos string a number
      .limit(Number(limite))
    ]);

    res.json({//respondemos en formato json.
        total,
        usuarios
    })
  };

  
//POST
  const usuariosPost = async (req, res=response) => {

      //obtener datos del body de un post
      const {nombre, correo, password, rol} = req.body;
      //instanciamos la clase Usuario, y le mandamos los campos 
      //al modelo enviados desde el body
      const usuario = new Usuario({nombre, correo, password, rol});

      //encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt) //encriptamos la contraseña


      //guardamos cambios en BD
      await usuario.save();

      res.json({
          usuario
      })
    }



//PUT
const usuariosPut = async(req, res=response) => {
  
  //el dato obtenido a traves de la ruta, viene en la request.params.
  const {id} = req.params;
  const {_id, password, google, correo, ...resto} = req.body;

  //TODO VALIDAR CONTRA BD
  if(password){
     //encriptar la contraseña
     const salt = bcryptjs.genSaltSync();
     resto.password = bcryptjs.hashSync(password, salt) //encriptamos la contraseña
  }

  //buscalo por el id y actualizalo
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    
    res.json(usuario)
  }


//DELETE
  const usuariosDelete = async (req, res=response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});//buscamos el usuario x id y modificamos
    res.json(usuario)
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