const db = require('../config/db');

const Producto = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM productos');
      return rows;
    } catch (err) {
      console.error('Error al obtener productos:', err);
      throw err;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO productos SET ?', [data]);
      return result;
    } catch (err) {
      console.error('Error al crear producto:', err);
      throw err;
    }
  }
};

module.exports = Producto;
