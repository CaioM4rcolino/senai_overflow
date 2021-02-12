const { index } = require("./students");

const Question  = require('../models/Question');

module.exports = {
    async find(req, res){

        const idPage = req.params.id; 
        
        
        try {
            
            const findPage = await Question.findAll({
                limit: 5, 
                offset: parseInt(idPage),
                subQuery: false
            });

            res.status(200).send(findPage);
        

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }
}