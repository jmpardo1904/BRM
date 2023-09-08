"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("rols", [
      {
        nombre: "Administrador",
      },
      {
        nombre: "Cliente",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

     return await queryInterface.bulkDelete('rols', null, {});
   
  },
};
