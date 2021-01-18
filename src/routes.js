const express = require("express");

const studentController = require('./controllers/students');

const questionController = require('./controllers/questions');

const answerController = require('./controllers/answers');

const feedController = require('./controllers/feed');


const routes = express.Router();

//configuração da rota de ALUNOS
routes.get("/students", studentController.index);

routes.get("/students/:id", studentController.find);

routes.post("/students", studentController.store);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

//configuração da rota de ALUNOS
routes.get("/questions", questionController.index);
routes.get("/questions/:id", questionController.find);
routes.post("/questions", questionController.store);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete)

routes.get("/questions/:id/answers", answerController.index);
routes.get("/questions/:id/answers/:answerId", answerController.find);
routes.post("/questions/:id/answers", answerController.store);

routes.get("/feed", feedController.index);

module.exports = routes;