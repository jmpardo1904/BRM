const express = require("express");
const router = express.Router();
const FacturaController = require("../controllers/FacturaController");


router.get("/", FacturaController.getAllPurchaseClients);
router.get("/:id", FacturaController.getOnePurchase);

// Otras rutas como obtener todas las compras, obtener una compra por ID, etc.

module.exports = router;
