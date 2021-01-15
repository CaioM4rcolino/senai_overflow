const { Model, DataTypes } = require("sequelize");

class Student extends Model{
    //aqui inicializamos nossos campos na tabela
    static init(sequelize){
        super.init(
            
            {

            ra: DataTypes.STRING,
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING

            },
            {
                sequelize,
                tableName: "alunos"
            }
        
        )
    }

    //aqui configuramos os relacionamentos (chave primária <-> chave estrangeira)
    static associate(models){
        this.hasMany(models.Question, {foreignKey: "id_aluno"})
        this.hasMany(models.Answer)

    }
}

module.exports = Student;