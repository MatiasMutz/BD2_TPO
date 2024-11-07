const { Schema, model } = require('mongoose');

const telefonoSchema = new Schema({
  codigo_area: { type: Number, required: true },
  nro_telefono: { type: Number, required: true },
  tipo: { type: String, required: true },
  nro_cliente: { type: Number, required: true }
});

module.exports = model('Telefono', telefonoSchema); 