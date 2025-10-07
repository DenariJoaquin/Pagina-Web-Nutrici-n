const express = require('express');
const router = express.Router();
const controllers = require('../controllers/producto.controller');

router.get('/', controllers.getProductos);
router.post('/', controllers.crearProducto);

module.exports = router;