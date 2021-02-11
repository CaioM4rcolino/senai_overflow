const Question  = require('../models/Question');
const Student = require('../models/Student')
const Answer = require("../models/Answer");
const { response, query } = require('express');
const { Op } = require("sequelize");



module.exports = {

    

    async index(req, res){
        
        // for (let assoc of Object.keys(Question.associations)) {
        //     for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
        //         console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
        //     }
        // }

        const question_id = req.params.id;

        try {

           

            const list_answers = await Answer.findAll({
                
                where: {question_id: question_id},

                attributes: ['id', 'description', 'student_id', 'created_at', 'updated_at']
                
            });
            res.status(200).send(list_answers);

            
            
            
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    

    }, 
    async store(req, res){

        const question_id = req.params.id;
        const {studentId} = req;
        const answer_description = req.body.description;

        try {
            
            let question = await Question.findByPk(question_id);
            let student = await Student.findByPk(studentId);

            if(!question){
               return res.status(404).send({error: "Pergunta não existe."});
            }
            if(!student){
               return res.status(404).send({error: "Aluno não existe."});
            }
            
            let answer = await question.createAnswer({description: answer_description, student_id: studentId});
             
            res.status(200).send(answer);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async find(req, res){

        const question_id = req.params.id;
        const answer_id = req.params.answerId;

        try {

            
            const listAnswerById = await Answer.findAll({
                    where: 
                    {
                        [Op.and]: [

                            {id: answer_id}, 
                            {question_id: question_id}
                        ]

                    },
                    attributes: ['id', 'description', 'student_id', 'created_at', 'updated_at']
                }
                    );

                if(!listAnswerById)
                    return res.status(404).send({error: "Resposta não encontrada. Verifique se o ID procurado existe no banco de dados."});
                else
                    res.status(200).send(listAnswerById);

            
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async update(req, res){



    },
    async delete(req, res){
        
    
        const question_id = req.params.id;
        const answer_id = req.params.answerId;

        try {

            let question = await Question.findByPk(question_id);
            let answer = await Answer.findByPk(answer_id);
            let deleteAnswer = "";

        if(!question){
            return res.status(404).send({error: 'Pergunta não encontrada. Verifique se você especificou a pergunta correta no endpoint.'})
        }
        else{

            if(!answer){
                return res.status(404).send({error: 'Resposta não encontrada.'})
            }
            else{
                deleteAnswer = await answer.destroy();
                return res.status(200).send({Sucess: 'Resposta deletada com sucesso.'})
            }
        }
            
        } catch (error) {
            console.log(error);
                res.status(500).send(error)
        }

    }
}
