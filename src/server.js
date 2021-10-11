require('dotenv').config();
const express = require('express');
const path = require('path');
const app = require('./app');
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Executando Servidor na porta ${PORT}`);
});