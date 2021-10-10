const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usrs = '/log';
        
        //Conexión
        this.connectDB();

        this.middlewares();
        this.routes();
    }
    async connectDB(){
        await dbConnection();
    }
    
    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes(){
       this.app.use(this.usrs,require('../routes/user'));
    }
    listener(){
        this.app.listen(this.port,() =>{
            console.log('HOST EN PUERTO =>',this.port);
        });
    }


}


module.exports = Server;