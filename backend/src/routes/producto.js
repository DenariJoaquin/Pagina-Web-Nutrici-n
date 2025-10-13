const express = require('express');
const router = express.Router();
const controllers = require('../controllers/producto');

router.get('/', controllers.getProductos);
router.post('/', controllers.crearProducto);

module.exports = router;