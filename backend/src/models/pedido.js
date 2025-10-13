const db = require('../config/db');

const Pedido = {
  crear: (usuario_id, total, estado = 'pendiente') => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)';
      db.query(query, [usuario_id, total, estado], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId); // devuelve el ID del nuevo pedido
      });
    });
  },

  obtenerPorUsuario: (usuario_id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY creado_en DESC';
      db.query(query, [usuario_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  obtenerPorId: (pedido_id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM pedidos WHERE id = ?';
      db.query(query, [pedido_id], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    });
  }
};

module.exports = Pedido;
