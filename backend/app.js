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

console.log('Base de datos:', process.env.DB_HOST);

app.use(express.json());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});