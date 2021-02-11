const Student = require('../models/Student');

module.exports = {

    async store(req, res){

        const {studentId} = req;

        const {firebaseUrl} = req.file ? req.file : null;

        if(!firebaseUrl)
            return res.status(400).send({error: "O campo de imagem é obrigatório."})


        try {
            
            const student = await Student.findByPk(studentId)
            console.log(student);

            if(!student)
              res.status(404).send({ Error: 'Aluno não encontrado'});

            student.photo = firebaseUrl;

            student.save();
         
            res.status(200).send({
                studentId,
                photo: student.photo
            });


        } catch (error) {
            
            res.status(500).send(error)

        }

        
        

    },
    async update(req, res){

    }

}