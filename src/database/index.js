const Sequelize = require("sequelize");
const dbConfig = require('../config/database');

const Aluno = require("../models/Student");

const Pergunta = require("../models/Question");


const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);
Pergunta.init(conexao);


Aluno.associate(conexao.models);
Pergunta.associate(conexao.models);