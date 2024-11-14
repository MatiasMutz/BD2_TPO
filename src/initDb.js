const mongoose = require('mongoose');
require('dotenv').config();

const Cliente = require('./models/clienteModel');
const DetalleFactura = require('./models/detalleFacturaModel');
const Factura = require('./models/facturaModel');
const Producto = require('./models/productoModel');
const Telefono = require('./models/telefonoModel');

const { loadClientesFromCSV, loadDetalleFacturaFromCSV, loadFacturasFromCSV, loadProductosFromCSV, loadTelefonosFromCSV } = require('./utils/dataLoader');

async function connectDatabase() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión exitosa con MongoDB');
    return connection.connection.db;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
}

async function seedDatabase() {
  console.log('🚀 Iniciando inicialización de la base de datos');
  
  try {
    const db = await connectDatabase();

    await db.dropDatabase();
    console.log('🗑️  Base de datos eliminada');
    
    const clientesData = await loadClientesFromCSV();
    const detalleFacturaData = await loadDetalleFacturaFromCSV();
    const facturasData = await loadFacturasFromCSV();
    const productosData = await loadProductosFromCSV();
    const telefonosData = await loadTelefonosFromCSV();
    
    await Cliente.insertMany(clientesData);
    await DetalleFactura.insertMany(detalleFacturaData);
    await Factura.insertMany(facturasData);
    await Producto.insertMany(productosData);
    await Telefono.insertMany(telefonosData);
    
    console.log('✅ Base de datos inicializada con éxito');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase(); 