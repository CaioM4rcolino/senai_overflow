const Student = require('../models/Student');

module.exports = {

    async index(request, response){

        try {

            const students = await Student.findAll({

                attributes: ['id', 'ra', 'name', 'email']
            }) 
            response.send(students);
            
        } catch (error) {
            console.log(error);
            response.status(500).send({ error })
        }
       
    
    
    },
    
    async find(request, response){

        const studentId = request.params.id;

        const specificStudent = await Student.findByPk(studentId, {

            attributes: ['id', 'ra', 'name', 'email']
        });

        if(specificStudent == null)
            response.status(404).send({Error: 'Aluno não encontrado.'});
        else
            response.status(200).send(specificStudent);


    },

    async store(request, response){

        const {ra, name, email, password } = request.body;
    
        try {

            let verifyRa = await Student.findOne({ where: { ra: ra } });

            if(verifyRa == null){
                //método para criar um registro em uma tabela no banco de dados
                let student = await Student.create({ra, name, email, password })
                response.status(201).send({ id: student.id});
            }
            else{
                response.status(400).send({Error: 'RA já registrado. Insira um RA único.'})
            }


        }catch (error) {

            console.log(error);
            response.status(500).send({ error })

        }
                              
    
    
    },
    async delete(request, response){

        //Buscar o id do aluno
        const studentId = request.params.id;
                        //  ^(args)|^ nome do parâmetro
    
        try {

            //Deletar o id correspondente
            students = await Student.destroy({
                where: {id: studentId}
            });
        
            if(!students){

                response.status(404).send({Error: 'Aluno não encontrado. Verifique se o ID existe no banco de dados.'});
               

            }
            else{
                 //Devolver a resposta com o status
                 response.status(200).send({Sucesso: 'Aluno deletado com sucesso.'});
            }
            

            
        } catch (error) {
            response.status(500).send(error);
        }
        
    },
    async update(request, response){

        //resgatar o id do aluno
        const studentId = request.params.id;
    
        // resgatar os dados do corpo
        const {name, email} = request.body;

        try {
            //fazer a alteração
            let updateStudent = await Student.update({name: name, email: email}, {where: {id: studentId}});
    
            if(updateStudent == null){

                response.status(404).send({Error: 'Erro ao atualizar o registro, verifique se a digitação dos dados está correta.'})

            }
            else{

                response.status(200).send();

            }
            
        } catch (error) {
            response.status(500).send(error);
        }
    
        
    
    },
    
}