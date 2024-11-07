const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
  nro_cliente: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  activo: { type: Number, required: true }
});

module.exports = model('Cliente', clienteSchema); 