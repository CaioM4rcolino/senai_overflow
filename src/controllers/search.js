const { Op } = require("sequelize");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

module.exports = {
    async find(req, res){

        const keyword = req.query.keyword;

        try {

            const question = await Question.findAll({
                where: {
                    [Op.or]: [

                        {title:{
                            [Op.like]: `%${keyword}%`
                        }},
                        {description: {
                            [Op.like]: `%${keyword}%`
                        }}
                        
                        
                    ]
                  
                   
                }
            })

            const answer = await Answer.findAll({
                where: {
                   description: {
                       [Op.like]: `%${keyword}%`
                   }
                   
                }
            })

        res.status(200).send({
            question,
            answer
        })
            
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}