const Question = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');
const { Sequelize } = require('sequelize');

module.exports = {

    //Nesse método não é procurado uma página específica, pois ele é carregado na hora em que o usuário entra na Home do site
    async index(req, res){

        try {            
            const questions = await Question.findAll({

                include: [{
                    association: 'Student',
                    attributes: ['id', 'name', 'photo']
                },
                {
                    association: 'Answers',
                    attributes: ['id', 'description','student_id', 'created_at'],
                    include: {
                        association: 'Student',
                        attributes: ['id', 'name', 'photo']
                    }
                },
                {
                    association: 'Categories',
                    through:{attributes: []},
                    attributes: ["id",
                    "description"]
                    
                },
               ],
                order: [["created_at", "DESC"]],
                limit: 5
             });
             
             res.status(200).send(questions);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    },

    async find(req, res){

        for (let assoc of Object.keys(Question.associations)) {
            for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
                console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
            }
        }

        const idPage = req.params.id; 
        const offSet = (idPage - 1) * 5;

        try {      
        
            const questions = await Question.findAll({

                include: [{
                    association: 'Student',
                    attributes: ['id', 'name', 'photo']
                },
                {
                    association: 'Answers',
                    separate: true,
                    attributes: ['id', 'description','student_id', 'created_at'],
                    include: {
                        association: 'Student',
                        attributes: ['id', 'name', 'photo']
                    }
                },
                {
                    association: 'Categories',
                    through:{attributes: []},
                    attributes: ["id",
                    "description"]
                    
                    
                }],
                order: [["created_at", "DESC"]],
                limit: 5,
                offset: parseInt(offSet)
             });
             
             res.status(200).send(questions);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    }
  
}