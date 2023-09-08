"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      apellidos: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      rolId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "rols",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
