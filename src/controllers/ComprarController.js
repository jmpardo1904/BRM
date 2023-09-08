const Compra = require("../models/Compra");
const Producto = require("../models/Producto");
const DetalleCompra = require("../models/DetalleCompra");

class ComprasController {
  async create(req, res) {
    try {
      const { fechaCompra, productos, userId } = req.body;

      let compras,
        compraArray = [],
        success = false;
      // Crea una nueva compra
      const data = await Compra.create({
        fecha: fechaCompra,
        total: 0,
        clienteID: userId,
      })
        .then((data) => {
          return data;
        })
        .catch((e) => {
          console.log(e.getMessage());
          res.status(500).end();
        });

      // Agrega productos a la compra con sus cantidades
      for (const productoInfo of productos) {
        const { productoId, cantidad } = productoInfo;

        // Busca el producto por su ID
        const producto = await Producto.findByPk(productoId);
        //total += producto.precio;

        if (!producto) {
          return res
            .status(404)
            .json({ error: `Producto con ID ${productoId} no encontrado` });
        }
        // return res.status(201).json(producto);
        // Crea una relación entre la compra y el producto con la cantidad
        compras = await DetalleCompra.create({
          cantidad: cantidad,
          productoId: producto.id,
          compraId: data.id,
        });

        compraArray.push(compras);
      }

      success = data instanceof Object;

      res.status(201).json(success);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

const comprasController = new ComprasController();
module.exports = comprasController;
