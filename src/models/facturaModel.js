const { Schema, model } = require('mongoose');

const facturaSchema = new Schema({
  nro_factura: { type: Number, required: true, unique: true },
  fecha: { type: String, required: true },
  total_sin_iva: { type: Number, required: true },
  iva: { type: Number, required: true },
  total_con_iva: { type: Number, required: true },
  nro_cliente: { type: Number, required: true }
});

module.exports = model('Factura', facturaSchema); 