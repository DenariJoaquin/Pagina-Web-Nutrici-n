const Producto = require('../models/Producto');

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Público

const obtenerProductos = async (req, res) => {
    try {
        const { categoria, destacado, nombre, page = 1, limit = 10 } = req.query;

        let query = {};

        // Filtros
        if (categoria) query.categoria = categoria;
        if (destacado) query.destacado = destacado === 'true';
        if (nombre) {
            query.nombre = { $regex: nombre, $options: 'i' }; // Búsqueda case insensitive
        }

        const productos = await Producto.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        
        const total = await Producto.countDocuments(query);

        res.json({
            success: true,
            count: productos.length,
            total,
            paginas: Math.ceil(total / limit),
            pagina: parseInt(page),
            data: productos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
};

// @desc    Obtener un producto por nombre
// @route   GET /api/productos/nombre/:nombre
// @access  Público
const obtenerProductoPorNombre = async (req, res) => {
  try {
    console.log('Parámetros recibidos:', req.params);
    console.log('Nombre buscado:', req.params.nombre);
    const nombre = req.params.nombre;
    console.log('Buscando producto:', nombreBuscado);
    
    // Buscar por nombre (case-insensitive)
    const producto = await Producto.findOne({
      where: {
        nombre: nombre  // Búsqueda exacta
      }
    });
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      console: {
        error: error.message
      }
    });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Privado (luego agregaremos autenticación)
const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: producto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorNombre,
  crearProducto
};