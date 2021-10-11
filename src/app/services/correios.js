require('dotenv').config();
const axios = require('axios');

//axios config setup viaCep api
const viaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws',
});

module.exports = viaCep;