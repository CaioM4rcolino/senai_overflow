//importa o express 
const express = require('express');
const {errors} = require('celebrate');


//Importa as rotas
const routes = require('./routes');

require('./database');

//cria a aplicação express
const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(routes);
app.use(errors());


module.exports = app;
