const db = require('../config/db');

const DetallePedido = {
  agregarProducto: async (pedido_id, producto_id, cantidad, precio_unitario) => {
    try {
      const query = `
        INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [
        pedido_id,
        producto_id,
        cantidad,
        precio_unitario
      ]);
      return result.insertId;
    } catch (err) {
      console.error('Error al agregar producto al detalle:', err);
      throw err;
    }
  },

  obtenerPorPedido: async (pedido_id) => {
    try {
      const query = `
        SELECT dp.*, p.nombre, p.descripcion, p.imagen
        FROM detalle_pedido dp
        JOIN productos p ON dp.producto_id = p.id
        WHERE dp.pedido_id = ?
      `;
      const [results] = await db.query(query, [pedido_id]);
      return results;
    } catch (err) {
      console.error('Error al obtener detalle del pedido:', err);
      throw err;
    }
  }
};

module.exports = DetallePedido;
