const { Model, DataTypes } = require("sequelize");

//nome em inglês para que não haja problemas na criação automática de funções
class Answer extends Model{
    //aqui inicializamos nossos campos na tabela
    static init(sequelize){
        super.init(
            
            {

            description: DataTypes.TEXT,
            student_id: DataTypes.INTEGER
        
            },
            {
                sequelize,
            }
        
        )
    }

    //aqui configuramos os relacionamentos (chave primária <-> chave estrangeira)
    static associate(models){

        this.belongsTo(models.Question)
        this.belongsTo(models.Student)


    }
}

module.exports = Answer;