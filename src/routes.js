const express = require("express");

const alunoController = require('./controllers/alunos');

const perguntaController = require('./controllers/perguntas');

const respostaController = require('./controllers/respostas');


const routes = express.Router();

//configuração da rota de ALUNOS
routes.get("/alunos", alunoController.listarAlunos);

routes.get("/alunos/:id", alunoController.listarAlunosPorId);

routes.post("/alunos", alunoController.inserirAlunos);

routes.delete("/alunos/:id", alunoController.deletarAluno);

routes.put("/alunos/:id", alunoController.editarAluno);

//configuração da rota de ALUNOS
routes.get("/perguntas", perguntaController.index);
routes.get("/perguntas/:id", perguntaController.index);
routes.post("/perguntas", perguntaController.store);
routes.put("/perguntas/:id", perguntaController.update);
routes.delete("/perguntas/:id", perguntaController.delete)

routes.get("/perguntas/:id/respostas", respostaController.index);
routes.get("/perguntas/:id/respostas/:idResposta", respostaController.find);
routes.post("/perguntas/:id/respostas", respostaController.store);

module.exports = routes;