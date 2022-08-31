const Server = require('./models/server');

require('dotenv').config();

const server = new Server();//instancia de la clase server en path /models

server.listen();//listamos el server