const fs = require('fs');
const csv = require('csv-parse/sync');

async function loadClientesFromCSV() {
    const fileContent = fs.readFileSync('Datasets/e01_cliente.csv', { encoding: 'latin1' });
    const records = csv.parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });
    
    return records.map(record => ({
      nro_cliente: parseInt(record.nro_cliente),
      nombre: record.nombre.replace(/"/g, ''),
      apellido: record.apellido.replace(/"/g, ''),
      direccion: record.direccion.replace(/"/g, ''),
      activo: parseInt(record.activo)
    }));
  }
  
  async function loadDetalleFacturaFromCSV() {
    const fileContent = fs.readFileSync('Datasets/e01_detalle_factura.csv', 'utf-8');
    const records = csv.parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });
    
    return records.map(record => ({
      nro_factura: parseInt(record.nro_factura),
      codigo_producto: parseInt(record.codigo_producto),
      nro_item: parseInt(record.nro_item),
      cantidad: parseFloat(record.cantidad)
    }));
  }
  
  async function loadFacturasFromCSV() {
    const fileContent = fs.readFileSync('Datasets/e01_factura.csv', 'utf-8');
    const records = csv.parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });
    
    return records.map(record => ({
      nro_factura: parseInt(record.nro_factura),
      fecha: record.fecha.replace(/"/g, ''),
      total_sin_iva: parseFloat(record.total_sin_iva),
      iva: parseFloat(record.iva),
      total_con_iva: parseFloat(record.total_con_iva),
      nro_cliente: parseInt(record.nro_cliente)
    }));
  }
  
  async function loadProductosFromCSV() {
    const fileContent = fs.readFileSync('Datasets/e01_producto.csv', 'utf-8');
    const records = csv.parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });
    
    return records.map(record => ({
      codigo_producto: parseInt(record.codigo_producto),
      marca: record.marca.replace(/"/g, ''),
      nombre: record.nombre.replace(/"/g, ''),
      descripcion: record.descripcion.replace(/"/g, ''),
      precio: parseFloat(record.precio),
      stock: parseInt(record.stock)
    }));
  }
  
  async function loadTelefonosFromCSV() {
    const fileContent = fs.readFileSync('Datasets/e01_telefono.csv', 'utf-8');
    const records = csv.parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });
    
    return records.map(record => ({
      codigo_area: parseInt(record.codigo_area),
      nro_telefono: parseInt(record.nro_telefono),
      tipo: record.tipo.replace(/"/g, ''),
      nro_cliente: parseInt(record.nro_cliente)
    }));
}

module.exports = {
    loadClientesFromCSV,
    loadDetalleFacturaFromCSV,
    loadFacturasFromCSV,
    loadProductosFromCSV,
    loadTelefonosFromCSV
};