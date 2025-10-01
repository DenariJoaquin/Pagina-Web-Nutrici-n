const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  precio: {
    type: Number,
    required: true,
    min: 0
    },
  descripcion: {
    type: String,
    required: true,
    enum: {
      values: ['suplementos', 'proteinas', 'vitaminas', 'snacks-saludables', 'superfoods'],
      message: 'Categoría no válida'
    }
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  destacado: {
    type: Boolean,
    default: false
  },
}, {
    timestamps: true
});

productoSchema.index({ nombre: 'text', descripcion: 'text' });
productoSchema.index({ categoria: 1 });
productoSchema.index({ destacado: 1 });

module.exports = mongoose.model('Producto', productoSchema);