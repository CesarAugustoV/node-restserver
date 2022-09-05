const res = require('express/lib/response');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol='')=>{//verificacion personalizada
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            //el throwError en express validator no revienta la aplicacion
            throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
};

//verificar si el correo existe
const emailExiste = async(correo='')=>{
    
    const buscarMail = await Usuario.findOne({correo});

    if(buscarMail){
        throw new Error(`El correo: ${correo}, ya esta registrado`)
        };
};
  
const existeUsuarioPorId = async(id)=>{
    
    const existeUsuario = await Usuario.findOne({id});

    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`)
        };
};


    

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}