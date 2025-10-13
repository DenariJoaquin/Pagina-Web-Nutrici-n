const express = require('express');
const dotenv = require('dotenv');
const cors = require('./src/middlewares/cors');
const productoRoutes = require('./src/routes/producto');
const pedidosRoutes = require('./src/routes/pedidos');
const errorHandler = require('./src/middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors);

const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Middleware de errores (debe ir al final)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});