const express = require("express");
const router = express.Router();
const ComprasController = require("../controllers/ComprarController");
router.post("/create", ComprasController.create);

// Otras rutas como obtener todas las compras, obtener una compra por ID, etc.

module.exports = router;
