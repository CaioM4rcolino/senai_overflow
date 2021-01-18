const { Model, DataTypes } = require("sequelize");

class Student extends Model{
    //aqui inicializamos nossos campos na tabela
    static init(sequelize){
        super.init(
            
            {

            ra: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING

            },
            {
                sequelize,
            }
        
        )
    }

    //aqui configuramos os relacionamentos (chave primária <-> chave estrangeira)
    static associate(models){
        this.hasMany(models.Question, {foreignKey: "student_id"})
        this.hasMany(models.Answer)

    }
}

module.exports = Student;