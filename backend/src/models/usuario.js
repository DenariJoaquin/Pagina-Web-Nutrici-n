const db = require('../config/db');

exports.crearUsuario = async (nombre, email, hash) => {
  return db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hash]);
};

exports.buscarPorEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};
