'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    queryInterface.createTable("perguntas", {

      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      foto:{
        type: Sequelize.STRING,
        allowNull: true
      },
      gist:{
        type: Sequelize.STRING,
        allowNull: true
      },
      id_aluno: {
        type: Sequelize.INTEGER,
        references:{
          model: "alunos", 
          key: "id"
        },

      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     queryInterface.dropTable("perguntas");
  }
};
