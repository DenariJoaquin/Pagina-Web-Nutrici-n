const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const productoRoutes = require('./src/routes/producto');
const pedidosRoutes = require('./src/routes/pedidos');
const errorHandler = require('./src/middlewares/errorHandler');
const authRoutes = require('./src/routes/auth');
const path = require('path');

dotenv.config();

app.use(express.json({type: 'application/json'}));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});