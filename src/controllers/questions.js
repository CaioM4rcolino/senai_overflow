const Question  = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');
const Category = require('../models/Category')
const { response } = require('express');

const fs = require('fs');



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

        const {title, description, photo, gist, categories} = req.body;

        const arrayCategories = categories.split(",");
        const {studentId} = req;

        try {
            //buscar o aluno pelo ID
            //se aluno não existir, retorna erro
            //cria a pergunta para o aluno
            //retorna sucesso
            let student = await Student.findByPk(studentId)

            if(!student)
                return res.status(404).send({ Error: 'Aluno não encontrado'});

            let question = await student.createQuestion({title, description, photo: req.file.filename, gist})

            question.addCategories(arrayCategories);

            res.status(201).send({
                id:question.id,
                title: question.title,
                description: question.description,
                created_at: question.created_at,
                gist: question.gist,
                photo: `http://localhost:3333/${req.file.path}`

            });

            

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
        const {studentId} = req;
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
        
        const {studentId} = req;
        const questionId = req.params.id;

        try {

            const question_student = await Question.findOne({where: {id: questionId, student_id: studentId}})
            
        

                if(!question_student){

                    return res.status(404).send({Error: "Pergunta não encontrada."})

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
