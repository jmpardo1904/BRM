const Compra = require("../models/Compra");
const Producto = require("../models/Producto");
const DetalleCompra = require("../models/DetalleCompra");
const Usuario = require("../models/Usuario");

class FacturaController {
  async getAllPurchaseClients(req, res) {
    try {
      const data = await Compra.findAll({
        include: [
          {
            model: Usuario,
          },
          {
            model: DetalleCompra, // Incluye los detalles de compra
            include: [
              {
                model: Producto,
                attributes: ["nombre", "precio"], // Selecciona el nombre del producto
              },
            ],
          },
        ],
      }).then((compras) => {
        let dataT = [];
        let products = [];
        let invoiceTotal = 0;

        if (compras.length > 0) {
          compras.forEach((compra) => {
            compra.detalle_compras.forEach((detalle) => {
              products.push({
                producto: detalle.producto.nombre,
                cantidad: detalle.cantidad,
              });
              const valorProducto = detalle.producto.precio * detalle.cantidad;
              invoiceTotal += valorProducto;
            });
            dataT.push({
              id: compra.id,
              fecha_compra: compra.fecha,
              nombre_cliente:
                compra.usuario.nombre + " " + compra.usuario.apellidos,
              productos: products,
              valor_factura: invoiceTotal,
            });
            products = [];
            invoiceTotal = 0;
          });
        } else {
          console.log("No se encontraron compras.");
        }
        return dataT;
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOnePurchase(req, res) {
    try {
      const { id } = req.params;
      const data = await Compra.findByPk(id, {
        include: [
          {
            model: Usuario,
          },
          {
            model: DetalleCompra, // Incluye los detalles de compra
            include: [
              {
                model: Producto,
                attributes: ["nombre", "precio"], // Selecciona el nombre del producto
              },
            ],
          },
        ],
      }).then((compra) => {
        let dataT;
        let products = [];
        let invoiceTotal = 0;

        compra.detalle_compras.forEach((detalle) => {
          products.push({
            producto: detalle.producto.nombre,
            cantidad: detalle.cantidad,
          });
          const valorProducto = detalle.producto.precio * detalle.cantidad;
          invoiceTotal += valorProducto;
        });
        dataT = {
          fecha_compra: compra.fecha,
          nombre_cliente:
            compra.usuario.nombre + " " + compra.usuario.apellidos,
          productos: products,
          valor_factura: invoiceTotal,
        };
        products = [];
        invoiceTotal = 0;

        return dataT;
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

const facturaController = new FacturaController();
module.exports = facturaController;
