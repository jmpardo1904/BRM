const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");
const DetalleCompra = require("./DetalleCompra");

const Compra = sequelize.define(
  "compra",
  {
    fecha: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    clienteID: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Compra.belongsTo(Usuario, { foreignKey: 'clienteID' }); // Una compra pertenece a un cliente

Compra.hasMany(DetalleCompra, { foreignKey: 'compraId' });

module.exports = Compra;
