'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('categories',[
      {
      description: 'Arquitetura de software',
      created_at: new Date(),
      updated_at: new Date()
      },
      {
        description: 'Testes de unidade',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Back-End',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Banco de Dados',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Mobile Back-end',
        created_at: new Date(),
        updated_at: new Date()
        
      },
      {
        description: 'Front-end',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Mobile Front-end',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Redes',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Hardware',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Sistemas Operacionais',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Linguagem orientada a objetos',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Linguagem procedural',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Linguagem funcional',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        description: 'Linguagem Imperativa',
        created_at: new Date(),
        updated_at: new Date()

      },

      ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */         
                                //nome da tabela, cláusula where, opções
     await queryInterface.bulkDelete('categories', null, {})
  }
};
