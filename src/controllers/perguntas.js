const Question  = require('../models/Question');
const Student = require('../models/Student')
const { response } = require('express');

module.exports = {

    index(req, res){

    }, 
    async store(req, res){

        const {titulo, descricao, foto, gist} = req.body;
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

        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }

      
    },
    find(req, res){

    },
    update(req, res){

    },
    delete(req, res){
        
    }
}