const { Model, DataTypes } = require("sequelize");

//nome em inglês para que não haja problemas na criação automática de funções
class Category extends Model{
    //aqui inicializamos nossos campos na tabela
    static init(sequelize){
        super.init(
            
            {

            descricao: DataTypes.STRING
        
            },
            {
                sequelize,
            }
        
        )
    }

    //aqui configuramos os relacionamentos (chave primária <-> chave estrangeira)
    static associate(models){

        this.belongsToMany(models.Question, {through: "question_category"})

    }
}

module.exports = Category;