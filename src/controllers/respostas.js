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
        const answer_id = req.params.idResposta;

        try {

            if(!answer_id){

                const list_answers = await Answer.findAll({where: {question_id: question_id}});
                res.status(200).send(list_answers);

            }
            
            
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    

    }, 
    async store(req, res){

        const question_id = req.params.id;
        const student_id = req.headers.authorization;
        const answer_description = req.body.descricao;

        try {
            
            let question = await Question.findByPk(question_id);
            let student = await Student.findByPk(student_id);

            if(!question){
               return res.status(404).send({Error: "Pergunta não existe."});
            }
            if(!student){
               return res.status(404).send({Error: "Aluno não existe."});
            }
            
            let answer = await question.createAnswer({description: answer_description, student_id: student_id});
             
            res.status(200).send(answer);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async find(req, res){

        const question_id = req.params.id;
        const answer_id = req.params.idResposta;

        try {

            if(answer_id != null){
                let listAnswerById = await Answer.findAll({
                    where: 
                    {
                        [Op.and]: [

                            {id: answer_id}, 
                            {question_id: question_id}
                        ]

                    }
                }
                    );

                if(!listAnswerById)
                    res.status(404).send({Error: "Resposta não encontrada. Verifique se o ID procurado existe no banco de dados."});
                else
                    res.status(200).send(listAnswerById);

            }
            
        } catch (error) {
            
        }

    },
    async update(req, res){


    },
    async delete(req, res){
        
    

    }
}
