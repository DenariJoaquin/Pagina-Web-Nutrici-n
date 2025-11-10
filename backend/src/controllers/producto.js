const Producto = require('../models/producto');

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
};

exports.crearProducto = (req, res) => {
    Producto.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({id: result.insertId, ...req.body});
    });
};