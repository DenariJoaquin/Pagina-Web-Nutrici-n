const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); 
const dotenv = require('dotenv');
dotenv.config();

const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password, nombre } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.crear(email, hashed, nombre);
    const token = jwt.sign({ id: nuevoUsuario.id, email, nombre, rol:'usuario' }, SECRET, { expiresIn: '1h' });
    console.log('Token generado:', token)
    res.json({ token });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).send('El email ya está registrado');
    }
    console.error('Error en registro:', err.message);
    res.status(500).send('Error al registrar usuario');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login recibido:', req.body);

    let usuarioEncontrado;
    try {
      const [rows] = await db.query('SELECT id, email, password, nombre, rol FROM usuarios WHERE email = ?', [email]);
      console.log('Resultado de query directa:', rows);
      usuarioEncontrado = rows[0];
    } catch (error) {
      console.error('Error en query directa:', error);
      return res.status(500).send('Error al buscar usuario');
    }

    if (!usuarioEncontrado) {
      console.log('Email incorrecto');
      return res.status(401).send('Email incorrecto');
    }

    const valido = await bcrypt.compare(password, usuarioEncontrado.password);
    console.log('¿Contraseña válida?', valido);

    if (!valido) {
      console.log('Contraseña incorrecta');
      return res.status(401).send('Contraseña incorrecta');
    }

    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        email: usuarioEncontrado.email,
        nombre: usuarioEncontrado.nombre,
        rol: usuarioEncontrado.rol || 'usuario'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token generado:', token);
    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error al iniciar sesión');
  }
};

