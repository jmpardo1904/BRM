const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserRol = sequelize.define(
  "rol",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = UserRol;
