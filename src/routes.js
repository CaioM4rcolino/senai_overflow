const express = require("express");

const authMiddleware = require("./middleware/authorization");
const middlewareStudents = require("./middleware/students");
const middlewareQuestions = require("./middleware/questions");
const middlewareAnswers = require("./middleware/answers");
const uploadQuestion = require('./middleware/uploadQuestion');
const uploadImagem = require('./services/uploadFirebase');

const studentController = require('./controllers/students');
const questionController = require('./controllers/questions');
const answerController = require('./controllers/answers');
const feedController = require('./controllers/feed');
const sessionController = require('./controllers/sessions');


const routes = express.Router();

// const upload = multer.single("arquivo");

// routes.post("/upload", upload, (req, res) => {

//     upload(req, res, (error)=>{
//         if(error){
//             res.status(400).send({error})
//         }
//     })
//     console.log(req.file);
//     res.send(req.file);
// });

//rotas públicas
routes.post("/sessions", sessionController.store);
routes.post("/students", middlewareStudents.create,studentController.store);


routes.use(authMiddleware);


//configuração da rota de ALUNOS
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

const multer = require("multer");

const Multer = multer({

    storage: multer.memoryStorage(),
    limits: {fileSize: 1024 * 1024 * 2}
})

//configuração da rota de PERGUNTAS
routes.get("/questions", questionController.index);
routes.get("/questions/:id", questionController.find);
routes.post("/questions", 
            Multer.single("photo"),
            uploadImagem,
            middlewareQuestions.create,
            questionController.store);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete)

//configuração da rota de RESPOSTAS
routes.get("/questions/:id/answers", answerController.index);
routes.get("/questions/:id/answers/:answerId", answerController.find);
routes.post("/questions/:id/answers", middlewareAnswers.create, answerController.store);
routes.delete("/questions/:id/answers/:answerId", answerController.delete);


routes.get("/feed", feedController.index);

module.exports = routes;