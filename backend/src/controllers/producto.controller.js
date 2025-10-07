const Producto = require('../models/producto.model');

exports.getProductos = (req, res) => {
    Producto.getAll((err, productos) => {
        if (err) return res.status(500).send(err);
        res.json(productos);
    });
};

exports.crearProducto = (req, res) => {
    Producto.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({id: result.insertId, ...req.body});
    });
};