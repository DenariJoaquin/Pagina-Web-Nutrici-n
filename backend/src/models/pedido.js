const db = require('../config/db');

const Pedido = {
  crear: async (usuario_id, total, estado = 'pendiente') => {
    try {
      const [result] = await db.query(
        'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)',
        [usuario_id, total, estado]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error al crear pedido:', err);
      throw err;
    }
  },

  obtenerPorUsuario: async (usuario_id) => {
    try {
      const [results] = await db.query(
        `SELECT p.id AS pedido_id, p.total, p.estado, p.creado_en,
                dp.producto_id, pr.nombre AS producto, dp.cantidad, dp.precio_unitario
         FROM pedidos p
         JOIN detalle_pedido dp ON p.id = dp.pedido_id
         JOIN productos pr ON dp.producto_id = pr.id
         WHERE p.usuario_id = ?
         ORDER BY p.creado_en DESC`,
        [usuario_id]
      );

      const pedidosMap = {};
      results.forEach(row => {
        if (!pedidosMap[row.pedido_id]) {
          pedidosMap[row.pedido_id] = {
            id: row.pedido_id,
            total: row.total,
            estado: row.estado,
            creado_en: row.creado_en,
            productos: []
          };
        }
        pedidosMap[row.pedido_id].productos.push({
          id: row.producto_id,
          nombre: row.producto,
          cantidad: row.cantidad,
          precio_unitario: row.precio_unitario
        });
      });

      return Object.values(pedidosMap);
    } catch (err) {
      console.error('Error al obtener pedidos por usuario:', err);
      throw err;
    }
  },

  obtenerPorId: async (pedido_id) => {
    try {
      const [result] = await db.query(
        'SELECT * FROM pedidos WHERE id = ?',
        [pedido_id]
      );
      return result[0];
    } catch (err) {
      console.error('Error al obtener pedido por ID:', err);
      throw err;
    }
  }
};

module.exports = Pedido;
