const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// Conexión a MongoDB - Configuración directa para Docker
mongoose.connect('mongodb://mongodb:27017/nutricion-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅Conectado a MongoDB en Docker'))
.catch(err => console.error('❌Error conectando a MongoDB:', err));

// Importar rutas
const apiRoutes = require('./routes/index');
const healthRoutes = require('./routes/health');
const productosRoutes = require('./routes/productos');


//importar middleware de logging
const { validarProducto } = require('./middlewares/validacion');

// Configuración de rutas
app.use('/api', apiRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/productos', validarProducto, productosRoutes);

//RUTA PRINCIPAL MEJORADA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Manejo de errores para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`,
    availableEndpoints: {
      health: '/api/health',
      api: '/api',
      productos: '/api/productos'
    }
  });
});

// Manejo de errores global
app.use((error, req, res) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
  });
});

// Puerto
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(` http://localhost:${PORT}/api/health`);
  console.log(` http://localhost:${PORT}/api`);
  console.log(` http://localhost:${PORT}/api/productos`);
});