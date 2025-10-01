const express = require('express');
const router = express.Router();

// Ruta principal de API
router.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de Nutrición',
    version: '1.0',
    endpoints: {
        health: '/api/health',
        productos: {
        getAll: 'GET /api/productos',
        getById: 'GET /api/productos/:id',
        create: 'POST /api/productos',
        update: 'PUT /api/productos/:id',
        delete: 'DELETE /api/productos/:id'
      }
    }
  });
});

module.exports = router;
