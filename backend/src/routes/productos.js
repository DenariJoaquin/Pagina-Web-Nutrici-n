const express = require('express');
const router = express.Router();
const{
    obtenerProductos,
    obtenerProductoPorNombre,
    crearProducto,
} = require('../controllers/productoControllers');

// Rutas de productos
router.route('/')
    .get(obtenerProductos)
    .post(crearProducto);

router.route('/nombre/:nombre')
    .get(obtenerProductoPorNombre);

module.exports = router;