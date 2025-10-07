const db = require('../models/db');

const DetallePedido = {
  agregarProducto: (pedido_id, producto_id, cantidad, precio_unitario) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)
      `;
      db.query(query, [pedido_id, producto_id, cantidad, precio_unitario], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },

  obtenerPorPedido: (pedido_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT dp.*, p.nombre, p.descripcion, p.imagen
        FROM detalle_pedido dp
        JOIN productos p ON dp.producto_id = p.id
        WHERE dp.pedido_id = ?
      `;
      db.query(query, [pedido_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = DetallePedido;
