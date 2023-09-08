"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("compras", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATE,
      },
      clienteID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      // detalleId: {
      //   type: Sequelize.DataTypes.INTEGER,
      //   references: {
      //     model: "detalle_compras",
      //     key: "id",
      //   },
      // },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("compras");
  },
};
