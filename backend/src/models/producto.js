const db = require ('../config/db');

const Producto = {
    getAll: (callback) => {
        db.query('SELECT * FROM productos', callback);
        console.log('Productos:', );
    },
    create: (data, callback) => {
        db.query('INSERT INTO productos SET ?', data, callback);
    },
};

module.exports = Producto;
