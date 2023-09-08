const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const Rol = require("./UserRol");

const Usuario = sequelize.define(
  "usuario",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Usuario.belongsTo(Rol, { foreignKey: "rolId" });
Rol.hasMany(Usuario, { foreignKey: "rolId" });

Usuario.beforeCreate(async (usuario) => {
  if (usuario.password) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  }
});
module.exports = Usuario;
