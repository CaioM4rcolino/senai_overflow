const express = require("express");

const alunoController = require('./controllers/alunos');

const perguntaController = require('./controllers/perguntas');


const routes = express.Router();

//configuração da rota de ALUNOS
routes.get("/alunos", alunoController.listarAlunos);

routes.get("/alunos/:id", alunoController.listarAlunosPorId);

routes.post("/alunos", alunoController.inserirAlunos);

routes.delete("/alunos/:id", alunoController.deletarAluno);

routes.put("/alunos/:id", alunoController.editarAluno);

//configuração da rota de ALUNOS
routes.post("/perguntas", perguntaController.store);

module.exports = routes;