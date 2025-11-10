const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');
const DetallePedido = require('../models/detallePedido');
const verifyToken = require('../middlewares/verifyToken');
const db = require('../config/db'); // ✅ movido arriba para consistencia

// Crear un nuevo pedido
router.post('/', verifyToken, async (req, res) => {
  try {
    const { usuario_id, productos } = req.body;

    const total = productos.reduce((sum, p) => sum + p.precio_unitario * p.cantidad, 0);

    const pedidoId = await Pedido.crear(usuario_id, total);

    for (const producto of productos) {
      await DetallePedido.agregarProducto(
        pedidoId,
        producto.producto_id,
        producto.cantidad,
        producto.precio_unitario
      );
    }

    res.status(201).json({ mensaje: 'Pedido creado con éxito', pedidoId });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

// Obtener detalle de un pedido
router.get('/detalle/:pedido_id', verifyToken, async (req, res) => {
  try {
    const detalle = await DetallePedido.obtenerPorPedido(req.params.pedido_id);
    res.json(detalle);
  } catch (error) {
    console.error('Error al obtener detalle del pedido:', error);
    res.status(500).json({ error: 'Error al obtener detalle del pedido' });
  }
});

// Obtener todos los pedidos del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const pedidos = await Pedido.obtenerPorUsuario(req.user.id);
    res.json(pedidos);
  } catch (err) {
    console.error('Error al obtener pedidos:', err.message);
    res.status(500).send('Error al cargar pedidos');
  }
});

// Confirmar pedido desde el carrito
router.post('/confirmar', verifyToken, async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const [carrito] = await db.query(
      `SELECT c.producto_id, c.cantidad, p.precio
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = ?`,
      [usuarioId]
    );

    if (carrito.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const [pedidoResult] = await db.query(
      'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)',
      [usuarioId, total, 'pendiente']
    );
    const pedidoId = pedidoResult.insertId;

    const detalleValues = carrito.map(item => [
      pedidoId,
      item.producto_id,
      item.cantidad,
      item.precio
    ]);

    await db.query(
      'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES ?',
      [detalleValues]
    );

    await db.query('DELETE FROM carrito WHERE usuario_id = ?', [usuarioId]);

    res.json({ mensaje: 'Pedido confirmado', pedidoId });
  } catch (err) {
    console.error('Error al confirmar pedido:', err.message);
    res.status(500).send('Error al confirmar pedido');
  }
});

module.exports = router;

