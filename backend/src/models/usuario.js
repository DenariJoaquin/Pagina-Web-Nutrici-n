const db = require('../config/db');

exports.crear = async (email, password, nombre) => {
  try {
    const [result] = await db.query(
      'INSERT INTO usuarios (email, password, nombre) VALUES (?, ?, ?)',
      [email, password, nombre]
    );
    return { id: result.insertId, email };
  } catch (err) {
    console.error('Error al crear usuario:', err);
    throw err;
  }
};

exports.buscarPorEmail = async (email) => {
  try {
    const [results] = await db.query(
      'SELECT id, email, password, nombre, rol FROM usuarios WHERE email = ?',
      [email]
    );
    console.log('Resultado de db.query:', results);
    return results[0];
  } catch (err) {
    console.error('Error al buscar usuario por email:', err);
    throw err;
  }
};

