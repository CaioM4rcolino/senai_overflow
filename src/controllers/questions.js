const Question  = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');
const Category = require('../models/Category')
const { response } = require('express');



module.exports = {

    

    async index(req, res){
        
        for (let assoc of Object.keys(Question.associations)) {
            for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
                console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
            }
        }

        try {

            const listQuestions = await Question.findAll();
            res.status(200).send(listQuestions);

        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    

    }, 
    async store(req, res){

     

        const {title, description, photo, gist, category} = req.body;
        const studentId = req.headers.authorization;
        try {
            //buscar o aluno pelo ID
            //se aluno não existir, retorna erro
            //cria a pergunta para o aluno
            //retorna sucesso
            let student = await Student.findByPk(studentId)

            if(!student)
                return res.status(404).send({ Error: 'Aluno não encontrado'});

            let question = await student.createQuestion({title, description, photo, gist})

            res.status(201).send(question);

            question.addCategories(category);
            

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

      
    },
    async find(req, res){

        const studentId = req.params.id;

        
        const listQuestionsByStudentId = await Question.findAll({where: {id_aluno: studentId}});

        if(!listQuestionsByStudentId)
            res.status(404).send({Error: "Pergunta não encontrada. Verifique se o ID procurado existe no banco de dados."});
        else
            res.status(200).send(listQuestionsByStudentId);

    },
    async update(req, res){

        const {title, description, photo, gist, category} = req.body;
        const studentId = req.headers.authorization;
        const questionId = req.params.id


        try {

            let question_student = await Question.findOne({where: {id: questionId, student_id: studentId}})

                if(!question_student){

                    res.status(404).send({Error: "ID mismatch: verifique se o ID inserido existe no banco ou se ele pertence ao ID do aluno especificado."})
                    
                }
                else{

                    question_student.title = title,
                    question_student.description = description,
                    question_student.photo = photo,
                    question_student.gist = gist,

                    await question_student.save();

                    res.status(200).send(question_student);
                   
                }
            }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async delete(req, res){
        
        const studentId = req.headers.authorization;
        const questionId = req.params.id;

        try {

            let question_student = await Question.findOne({where: {id: questionId, student_id: studentId}})
        
        

                if(!question_student.id){

                    res.status(404).send({Error: "ID not found: Pergunta não encontrada no banco de dados. Verifique se o ID digitado está correto."})

                    if(!question_student.student_id){

                        res.status(401).send({Error: "ID Mismatch: Você não tenha autorização para deletar essa pergunta."})

                    }

                    
                }
                else{

                    await question_student.destroy();

                    res.status(200).send({Sucess: "Pergunta deletada com sucesso."});
                   
                }
            }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
}
