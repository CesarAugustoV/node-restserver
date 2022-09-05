//conectando a la base de datos

const mongoose = require('mongoose');//ocupamos coneccion de mongoose

const dbConnection = async() =>{

    try{
        //por documentacion debe hacerse
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada.');

    } catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos.');
    }


}


module.exports = {
    dbConnection
}