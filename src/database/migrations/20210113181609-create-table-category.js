'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      //A partir daqui as nomenclaturas serão em inglês devido a ocasionais erros encontrados nas outras migrations por causa do idioma. O sequelize toma como padrão métodos, chaves e campos como inglês, o que acaba gerando conflito caso os nomes não sejam especificados. 

     queryInterface.createTable("categories", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false
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

     queryInterface.dropTable("categories")
  }
};
