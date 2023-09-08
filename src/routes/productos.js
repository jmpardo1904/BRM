const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/ProductoController");

// Ruta para crear un producto
router.post("/create", ProductoController.create);

// Ruta para obtener todos los productos
router.get("/", ProductoController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get("/:id", ProductoController.getOneProduct);

// Ruta para actualizar un producto por su ID
router.put("/:id", ProductoController.update);

// Ruta para eliminar un producto por su ID
router.delete("/:id", ProductoController.delete);

// Ruta para ver el historial completo de las compras
router.get("/historial/:id", ProductoController.getHistory);


module.exports = router;
