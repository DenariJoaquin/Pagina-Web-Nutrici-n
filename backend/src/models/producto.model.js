const db = require ('./db');

const Producto = {
    getAll: (callback) => {
        db.query('SELECT * FROM productos', callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO productos SET ?', data, callback);
    },
};

module.exports = Producto;
