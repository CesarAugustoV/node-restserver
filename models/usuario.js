//requerimos de mongoose schema y model
const { Schema, model } = require('mongoose'); 

//Modelo usuario
const UsuarioSchema = Schema({//esquema
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function (){
    //saca las propiedades __V, password y el resto se guarda en usuario
    const {__v, password,_id, ...usuario} = this.toObject();//genera un objeto literal con los valores respectivos.
    usuario.uid = _id;
    return usuario;//retorna usuario.
}


//exportar usando la funcion model de mongoose, 
//pide el nombre que va a tener la coleccion, y el esquema creado o modelo.
module.exports = model('Usuario', UsuarioSchema);
//al parecer mongoose le añade una S al final del nombre, es decir Usuarios