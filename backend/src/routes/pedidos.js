const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');
const DetallePedido = require('../models/detallePedido');

// Crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const { usuario_id, productos } = req.body;

    // Calcular total
    const total = productos.reduce((sum, p) => sum + p.precio_unitario * p.cantidad, 0);

    // Crear pedido
    const pedidoId = await Pedido.crear(usuario_id, total);

    // Agregar productos al detalle
    for (const producto of productos) {
      await DetallePedido.agregarProducto(pedidoId, producto.producto_id, producto.cantidad, producto.precio_unitario);
    }

    res.status(201).json({ mensaje: 'Pedido creado con éxito', pedidoId });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

// Obtener pedidos de un usuario
router.get('/:usuario_id', async (req, res) => {
  try {
    const pedidos = await Pedido.obtenerPorUsuario(req.params.usuario_id);
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Obtener detalle de un pedido
router.get('/detalle/:pedido_id', async (req, res) => {
  try {
    const detalle = await DetallePedido.obtenerPorPedido(req.params.pedido_id);
    res.json(detalle);
  } catch (error) {
    console.error('Error al obtener detalle del pedido:', error);
    res.status(500).json({ error: 'Error al obtener detalle del pedido' });
  }
});

module.exports = router;
