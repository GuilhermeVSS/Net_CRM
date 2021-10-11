const express = require('express');
const routes = require('./routes');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./doc/swagger_output.json');

require('./database');

class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerJson));
        this.server.use('/files',express.static(path.resolve(__dirname, "..", "tmp", "uploads")))
        this.server.use(routes);
    }
}

module.exports = new App().server;