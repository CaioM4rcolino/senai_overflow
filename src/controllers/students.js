const Student = require('../models/Student');
const { JsonWebTokenError } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils');


module.exports = {

    async index(request, response){

        try {

            const students = await Student.findAll({

                attributes: ['id', 'ra', 'name', 'email', 'photo']
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
        const encryptedPassword = bcrypt.hashSync(password);

    
        try {

            let verifyRa = await Student.findOne({ where: { ra: ra } });
            let verifyEmail = await Student.findOne({where: {email: email}});

            if(verifyRa == null){
                if(verifyEmail == null){
                //método para criar um registro em uma tabela no banco de dados
                let student = await Student.create({ra, name, email, password: encryptedPassword })
              
                const token = generateToken({studentId: student.id, studentName: student.name});
                response.status(201).send(
                    {
                        student: {
                            studentId: student.id,
                            name: student.name,
                            RA: student.ra,
                            email: student.email
                        },
                        
                        token
                    });

                }
                else{

                    response.status(400).send({error: 'Email já registrado. Insira um email único.'})

                }
            }
            else{
                response.status(400).send({error: 'RA já registrado. Insira um RA único.'})
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

                response.status(200).send({Sucess: "Estudante atualizado com sucesso."});

            }
            
        } catch (error) {
            response.status(500).send(error);
        }
    
        
    
    },
    
}