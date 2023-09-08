'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroLote: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      cantidadDisponible: {
        type: Sequelize.INTEGER
      },
      fechaIngreso: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};