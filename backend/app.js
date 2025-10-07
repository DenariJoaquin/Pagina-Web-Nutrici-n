const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const productoRoutes = require('./src/routes/producto.routes');
app.use('/api/productos', productoRoutes);

const pedidosRoutes = require('./src/routes/pedidos');
app.use('/api/pedidos', pedidosRoutes);

const PORT = process.env.PORT || 3000;
app .listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
