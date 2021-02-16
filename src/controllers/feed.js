const Question = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');

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
                    attributes: ["id","description"]
            
                }],
                order: [["created_at", "DESC"]],
                limit: 5,
                subQuery: false
             });
             
             console.log(questions);
             res.status(200).send(questions);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    },

    //esse método vai ser usado quando o botão "VER MAIS" for implementado, ou seja o usuário vai fazer uma requisição para que ele avance uma página e mostre mais questões
    async find(req, res){

        for (let assoc of Object.keys(Question.associations)) {
            for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
                console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
            }
        }

        const idPage = req.params.id; 

        //No mysql o offset começa com 0, mas no site o ideal seria que as páginas começassem com 1 (o usuário não entenderia página 0) então eu fiz com que a requisição na rota fosse normal (começasse com 1), e antes de mandar pro banco de dados eu subtraio esse parâmetro por 1, ou seja

        //localhost:3333/feed/1 ---> Procuro a página 1

        //offset = 1 - 1 = 0 ---> O banco vai procurar o offset 0
        const offSet = idPage - 1;

        //A forma que está sendo feita aqui (usando o Include) é a forma Eager Loading, que causa um bug na hora de buscar as questões -- o ideal seria usar Lazy loading, porém ainda não foi implementado devido a bugs

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
                order: [["created_at", "DESC"]],
                limit: 5,
                offset: parseInt(offSet),
                subQuery: false
             });
             
             res.status(200).send(questions);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    }
  
}