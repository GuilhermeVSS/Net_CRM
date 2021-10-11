const swagger = require('swagger-autogen')();

const path = './src/doc/swagger_output.json';
const vec = ['./src/routes.js'];

swagger(path, vec).then(()=>{
    require('./server');
});
