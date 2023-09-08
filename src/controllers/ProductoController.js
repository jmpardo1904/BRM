const Producto = require("../models/Producto");
const Compra = require("../models/Compra");
const Usuario = require("../models/Usuario");
const DetalleCompra = require("../models/DetalleCompra");

class ProductoController {
  async create(req, res) {
    try {
      const producto = await Producto.create(req.body);
      res.status(201).json({ ok: "Producto creado exitosamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAllProducts(req, res) {
    try {
      const productos = await Producto.findAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOneProduct(req, res) {
    const { id } = req.params;
    try {
      const producto = await Producto.findByPk(id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Producto.update(req.body, { where: { id } });
      if (updated) {
        const updatedProducto = await Producto.findByPk(id);
        res.json(updatedProducto);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Producto.destroy({ where: { id } });
      if (deleted) {
        res.status(201).json({ ok: "El producto se eliminó con exito" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getHistory(req, res) {
    try {
      const compras = await Compra.findAll({
        include: [
          {
            model: Usuario,
          },
          {
            model: DetalleCompra, // Incluye los detalles de compra
            include: [
              {
                model: Producto,
                attributes: ["nombre", "precio"], // Selecciona el nombre y el precio del producto
              },
            ],
          },
        ],
      });

      const historialClientes = {};

      compras.forEach((compra) => {
        const clienteNombre =
          compra.usuario.nombre + " " + compra.usuario.apellidos;

        if (!historialClientes[clienteNombre]) {
          historialClientes[clienteNombre] = {
            nombre_cliente: clienteNombre,
            productos_comprados: [],
            valor_total_compras: 0,
          };
        }

        compra.detalle_compras.forEach((detalle) => {
          const productoComprado = {
            fecha_compra: compra.fecha,
            producto: detalle.producto.nombre,
            cantidad: detalle.cantidad,
            valor_total: detalle.producto.precio * detalle.cantidad,
          };
          historialClientes[clienteNombre].productos_comprados.push(
            productoComprado
          );
          historialClientes[clienteNombre].valor_total_compras +=
            productoComprado.valor_total;
        });
      });

      const historialClientesArray = Object.values(historialClientes);

      res.status(201).json(historialClientesArray);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

const productoController = new ProductoController();
module.exports = productoController;
