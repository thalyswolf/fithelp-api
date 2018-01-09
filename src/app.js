'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config');
var cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend:false }));

//habilita o cors
app.use(cors());

//conecta ao banco
mongoose.connect(config.connectionString);

//carrega os modelos
const User = require('./models/user-model');

//carrega as rotas
const index = require('./routes/index');
const userRoute = require('./routes/user-route');


app.use('/', index);
app.use('/users', userRoute);

module.exports = app;
