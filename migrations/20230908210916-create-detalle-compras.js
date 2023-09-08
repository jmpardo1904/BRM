"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detalle_compras", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cantidad: {
        type: Sequelize.INTEGER,
      },
      productoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "productos",
          key: "id",
        },
      },
      compraId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "compras",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("detalle_compras");
  },
};
