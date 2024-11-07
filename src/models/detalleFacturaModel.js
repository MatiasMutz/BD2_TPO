const { Schema, model } = require('mongoose');

const detalleFacturaSchema = new Schema({
  nro_factura: { type: Number, required: true },
  codigo_producto: { type: Number, required: true },
  nro_item: { type: Number, required: true },
  cantidad: { type: Number, required: true }
});

module.exports = model('DetalleFactura', detalleFacturaSchema); 