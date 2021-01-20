'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    queryInterface.createTable("questions", {

      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      title:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false
      },
      photo:{
        type: Sequelize.STRING,
        allowNull: true
      },
      gist:{
        type: Sequelize.STRING,
        allowNull: true
      },
      student_id: {
        type: Sequelize.INTEGER,
        references:{
          model: "students", 
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull:false

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

     queryInterface.dropTable("questions");
  }
};
