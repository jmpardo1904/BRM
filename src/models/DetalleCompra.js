const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Producto = require("../models/Producto");

const DetalleCompra = sequelize.define(
  "detalle_compras",
  {
    cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  },
  {
    timestamps: false,
  }
);

DetalleCompra.associate = function (models) {
  DetalleCompra.belongsTo(models.Producto, {
    foreignKey: "productoId",
    onDelete: "CASCADE",
  });
};

DetalleCompra.belongsTo(Producto, { foreignKey: 'productoId' }); // Un detalle de compra pertenece a un producto


module.exports = DetalleCompra;
