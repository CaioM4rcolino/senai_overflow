const { Model, DataTypes } = require("sequelize");

//nome em inglês para que não haja problemas na criação automática de funções
class Question extends Model{
    //aqui inicializamos nossos campos na tabela
    static init(sequelize){
        super.init(
            
            {

            titulo: DataTypes.STRING,
            descricao: DataTypes.STRING,
            foto: DataTypes.STRING,
            gist: DataTypes.STRING

            },
            {
                sequelize,
                tableName: "perguntas"
            }
        
        )
    }

    //aqui configuramos os relacionamentos (chave primária <-> chave estrangeira)
    static associate(models){
        this.belongsTo(models.Student, {foreignKey: "id_aluno"})
        this.belongsToMany(models.Category, {through: "question_category"})
        this.hasMany(models.Answer)
    }
}

module.exports = Question;