'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.createTable('question_category', {

      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_id: {
        type: Sequelize.INTEGER,
        references:{
          model: "perguntas", 
          key: "id"
        },
        allowNull: false
      },
      category_id: {
          type: Sequelize.INTEGER,
          references:{
            model: "categories", 
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

    queryInterface.dropTable('question_category');
  }
};
