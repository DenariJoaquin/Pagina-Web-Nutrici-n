const express = require('express');
const router = express.Router();

// health check route
router.get('/', (req, res) => {
  res.json({ 
    message: 'Backend funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Nutrición API',
    version: '1.0.0'
  });
});

module.exports = router;
