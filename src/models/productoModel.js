const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
  codigo_producto: { type: Number, required: true, unique: true },
  marca: { type: String, required: true },
  nombre: { type: String },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
});

module.exports = model('Producto', productoSchema); 