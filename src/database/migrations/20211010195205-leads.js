'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leads', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: {model: 'internet_plans', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      client_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_cpf:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_address:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_cep:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type:Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type:Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('leads');
  }
};
