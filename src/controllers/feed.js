const Question = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');

module.exports = {


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
                    attributes: ["id", "description"]
                    
                    
                }],
                order: [["created_at", "DESC"]]
             });
             
             res.status(200).send(questions);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    }
  
}