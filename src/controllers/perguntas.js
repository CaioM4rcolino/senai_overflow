const Question  = require('../models/Question');
const Student = require('../models/Student')
const { response } = require('express');



module.exports = {

    

    async index(req, res){
        
        const alunoId = req.params.id;

        try {

            if(!alunoId){
                const listQuestions = await Question.findAll();
                res.status(200).send(listQuestions);

            }
            else{
                const listQuestionsByStudentId = await Question.findAll({where: {id_aluno: alunoId}});

                if(!listQuestionsByStudentId)
                    res.status(404).send({Error: "Pergunta não encontrada. Verifique se o ID procurado existe no banco de dados."});
                else
                    res.status(200).send(listQuestionsByStudentId);

            }
            
            
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    

    }, 
    async store(req, res){

     

        const {titulo, descricao, foto, gist, categoria} = req.body;
        const alunoId = req.headers.authorization;
        try {
            //buscar o aluno pelo ID
            //se aluno não existir, retorna erro
            //cria a pergunta para o aluno
            //retorna sucesso
            let aluno = await Student.findByPk(alunoId)

            if(!aluno)
                return res.status(404).send({ erro: 'Aluno não encontrado'});

            let pergunta = await aluno.createQuestion({titulo, descricao, foto, gist})

            res.status(201).send(pergunta);

            pergunta.addCategories(categoria);
            

        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }

      
    },
    find(req, res){

    },
    async update(req, res){

        const {titulo, descricao, foto, gist} = req.body;
        const alunoId = req.headers.authorization;
        const perguntaId = req.params.id


        try {

            let pergunta_aluno = await Question.findOne({where: {id: perguntaId, id_aluno: alunoId}})

                if(!pergunta_aluno){

                    res.status(404).send({Erro: "ID mismatch: verifique se o ID inserido existe no banco ou se ele pertence ao ID do aluno especificado."})
                    
                }
                else{

                    pergunta_aluno.titulo = titulo,
                    pergunta_aluno.descricao = descricao,
                    pergunta_aluno.foto = foto,
                    pergunta_aluno.gist = gist

                    await pergunta_aluno.save();

                    res.status(200).send(pergunta_aluno);
                   
                }
            }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async delete(req, res){
        
        const alunoId = req.headers.authorization;
        const perguntaId = req.params.id;

        try {

            let pergunta_aluno = await Question.findOne({where: {id: perguntaId, id_aluno: alunoId}})

                if(!pergunta_aluno.id){

                    res.status(404).send({Erro: "ID not found: Pergunta não encontrada no banco de dados. Verifique se o ID digitado está correto."})

                    if(!pergunta_aluno.id_aluno){

                        res.status(401).send({Erro: "ID Mistmatch: Você não tenha autorização para deletar essa pergunta."})

                    }

                    
                }
                else{

                    await pergunta_aluno.destroy();

                    res.status(200).send({Sucess: "Pergunta deletada com sucesso."});
                   
                }
            }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
}
