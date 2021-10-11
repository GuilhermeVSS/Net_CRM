#
# 📡💻 NetCRM

</br>

## Sobre/About
Essa é uma api node com o objetivo de prover um sistema de captura de leads. Onde é feito o CRUD de Planos de Internet, Leads e usuários

This is a node api with the objective to provide a capture system of leads. There is possible to do a CRUD of internet plans, leads and users.
    
</br>

## Dando Início/Get started

- Primeiro, instale as dependências usando ```yarn install```;
- Certifique que você tenha:
    - Um servidor postgres online
- Execute o comando ```yarn sequelize db:create``` para gerar o banco
- Execute o comando ```yarn sequelize db:migrate``` parar criar as tabelas
- Execute o comando ```node src/swagger.js``` para gerar a documentação automática
- Por último, crie um arquivo ```.env``` e coloque dentro dele:
```.env
    PORT=<Porta onde a api sera executada>
    JWT_TOKEN=<Um hash que sera usado na geracão do token, pode usar um md5 online>
    JWT_EXPIRES=<Uma configuracao de quanto tempo o token gerado será válido: 1d, 2d etc..>
```
- First, install dependencies using ```yarn install```;
- Make sure you have: 
    - a postgres server;
- Create your database using  ```yarn sequelize db: create```
- Create your database tables ```yarn sequelize db:migrate```
- Execute the following command ```node src/swagger.js``` to generate the automatic documentation
- For last, create a ```.env``` and put inside:

```.env
PORT=<Port api running>
JWT_TOKEN=<a hash, it will be use on token generate, it could be generate by md5 online>
JWT_EXPIRES=<a configuration about how long a token will be availabe. 1d, 2d, etc...>
```

### Referências/Referencies
* Dependências/Dependencies
    * [Axios](https://www.npmjs.com/package/axios)
    * [Dotenv](https://www.npmjs.com/package/dotenv)
    * [Express](https://www.npmjs.com/package/express)
    * [Sequelize](https://www.npmjs.com/package/sequelize)
    * [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli)
    * [Swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) [Swagger-autogen](https://www.npmjs.com/package/swagger-autogen)
* Documentação de Serviços/Documentation Services
    * [Sequelize](https://sequelize.org/)
    * [viaCEP](https://viacep.com.br/)
    * [Sequelize](https://sequelize.org/)
    * [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli)
    * [Swagger](https://swagger.io/docs/)


``` ```
## Autor/Author
*Guilherme Ventura Santos Silva [GVSS]*

[![Twitter Badge](https://img.shields.io/badge/-@gventura_ss-6633cc?style=flat-square&labelColor=000000&logo=twitter&logoColor=white&link=https://twitter.com/gventura_ss)](https://twitter.com/gventura_ss) [![Linkedin Badge](https://img.shields.io/badge/-Guilherme%20Ventura-6633cc?style=flat-square&logo=Linkedin&logoColor=black&link=https://www.linkedin.com/in/guilherme-ventura-703612150/)](https://www.linkedin.com/in/gvssilva/) [![Gmail Badge](https://img.shields.io/badge/-guilhermevssilva.99@gmail.com-6633cc?style=flat-square&logo=Gmail&logoColor=black&link=mailto:guilhermevssilva.99@gmail.com)](mailto:guilhermevssilva.99@gmail.com)

## License 

MIT License

Copyright (c) 2021 Guilherme Ventura Santos Silva

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.