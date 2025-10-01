const validarProducto = (req, res, next) => {
  const { nombre, precio, categoria } = req.body;
  
  const errores = [];

  if (!nombre || nombre.trim().length === 0) {
    errores.push('El nombre del producto es obligatorio');
  }

  if (!precio || isNaN(precio) || precio < 0) {
    errores.push('El precio debe ser un número válido y no negativo');
  }

  if (!categoria || !['suplementos', 'proteinas', 'vitaminas', 'snacks-saludables', 'superfoods'].includes(categoria)) {
    errores.push('Categoría no válida');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errores
    });
  }

  next();
};

module.exports = {
  validarProducto
};