const express = require('express');
const cors = require('cors');//middleware: ofrece una seguridad superficial. Algunos navegadores lo requieren.


class Server{
    
    constructor(){
        //propiedades
        this.app = express(); //crea una propiedad app, cada vez que se ejecuta el constructor
        this.port = process.env.PORT; //crea una propiedad llamada port donde guarda el puerto enviado a traves de una variable de entorno.
        this.usuariosPath = '/api/usuarios';
       
        //middlewares
        this.middlewares();//ejecutamos el metodo
        
        //rutas de aplicacion
        this.routes();//ejecuta el metodo.
    }
    
    
    middlewares(){
        
        //CORS= express().use(cors())
        this.app.use(cors());
        
        //lectura y parse del body a formato json.
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public')); //enviamos app static

    }

    routes(){
        
//usamos el middleware para que cuando se envie una solicitud en localhost/api/usuarios, requiera el archivo user.js en la carpeta routes
        this.app.use(this.usuariosPath, require('../routes/usuarios'));


    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Puerto corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;