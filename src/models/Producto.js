const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Producto = sequelize.define(
  "producto",
  {
    numeroLote: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    precio: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    cantidadDisponible: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fechaIngreso: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Producto.associate = function (models) {
  Producto.hasMany(models.DetalleCompra, {
    foreignKey: "productoId",
    as: "detalles",
  });
};

module.exports = Producto;
