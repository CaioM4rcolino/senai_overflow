const Student = require('../models/Student');

module.exports = {

    async listarAlunos(request, response){

        try {

            const alunos = await Student.findAll({

                attributes: ['id', 'ra', 'nome', 'email']
            }) 
            response.send(alunos);
            
        } catch (error) {
            console.log(error);
            response.status(500).send({ error })
        }
       
    
    
    },
    
    async listarAlunosPorId(request, response){

        const idAluno = request.params.id;

        const alunoEspecifico = await Student.findByPk(idAluno, {

            attributes: ['id', 'ra', 'nome', 'email']
        });

        if(alunoEspecifico == null)
            response.status(404).send({Erro: 'Aluno não encontrado.'});
        else
            response.status(200).send(alunoEspecifico);


    },

    async inserirAlunos(request, response){

        const {ra, nome, email, senha } = request.body;
    
        try {

            let testeRa = await Student.findOne({ where: { ra: ra } });

            if(testeRa == null){
                let aluno = await Student.create({ra, nome, email, senha })
                response.status(201).send({ id: aluno.id});
            }
            else{
                response.status(400).send({Erro: 'RA já registrado. Insira um RA único.'})
            }


        }catch (error) {

            console.log(error);
            response.status(500).send({ error })

        }
                              //método para criar um registro em uma tabela no banco de dados
    
    
    },
    async deletarAluno(request, response){

        //Buscar o id do aluno
        const alunoId = request.params.id;
                        //  ^(args)|^ nome do parâmetro
    
        try {

            //Deletar o id correspondente
            alunos = await Student.destroy({
                where: {id: alunoId}
            });
        
            if(!alunos){

                response.status(404).send({Erro: 'Aluno não encontrado. Verifique se o ID existe no banco de dados.'});
               

            }
            else{
                 //Devolver a resposta com o status
                 response.status(200).send({Sucesso: 'Aluno deletado com sucesso.'});
            }
            

            
        } catch (error) {
            response.status(500).send(error);
        }
        
    },
    async editarAluno(request, response){

        //resgatar o id do aluno
        const idAluno = request.params.id;
    
        // resgatar os dados do corpo
        const {nome, email} = request.body;

        try {
            //fazer a alteração
            let alteracao = await Student.update({nome: nome, email: email}, {where: {id: idAluno}});
    
            if(alteracao == null){

                response.status(404).send({Erro: 'Erro ao atualizar o registro, verifique se a digitação dos dados está correta.'})

            }
            else{

                response.status(200).send();

            }
            
        } catch (error) {
            response.status(500).send(error);
        }
    
        
    
    },
    
}