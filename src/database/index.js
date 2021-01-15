const Sequelize = require("sequelize");
const dbConfig = require('../config/database');

const Aluno = require("../models/Student");
const Pergunta = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");

const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);
Pergunta.init(conexao);
Category.init(conexao);
Answer.init(conexao)

Aluno.associate(conexao.models);
Pergunta.associate(conexao.models);
Category.associate(conexao.models)
Answer.associate(conexao.models);