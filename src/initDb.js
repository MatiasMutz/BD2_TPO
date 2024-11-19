const mongoose = require('mongoose');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const Cliente = require('./models/clienteModel');
const DetalleFactura = require('./models/detalleFacturaModel');
const Factura = require('./models/facturaModel');
const Producto = require('./models/productoModel');
const Telefono = require('./models/telefonoModel');

const { loadClientesFromCSV, loadDetalleFacturaFromCSV, loadFacturasFromCSV, loadProductosFromCSV, loadTelefonosFromCSV } = require('./utils/dataLoader');

async function connectMongoDatabase() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión exitosa con MongoDB');
    return connection.connection.db;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
}

async function connectNeo4jDatabase() {
  try {
    const driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
      { encrypted: 'ENCRYPTION_OFF' }
    );
    const session = driver.session();
    console.log('✅ Conexión exitosa con Neo4j');
    return { session, driver };
  } catch (error) {
    console.error('❌ Error conectando a Neo4j:', error);
    throw error;
  }
}

async function seedMongoDatabase() {
  console.log('🚀 Iniciando inicialización de la base de datos MongoDB');
  
  try {
    const db = await connectMongoDatabase();

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

async function seedNeo4jDatabase() {
  console.log('🚀 Iniciando inicialización de la base de datos Neo4j');
  let session, driver;
  
  try {
    const connection = await connectNeo4jDatabase();
    session = connection.session;
    driver = connection.driver;
    
    await session.run('MATCH (n) DETACH DELETE n');
    console.log('🗑️  Base de datos eliminada');
    
    const clientesData = await loadClientesFromCSV();
    const detalleFacturaData = await loadDetalleFacturaFromCSV();
    const facturasData = await loadFacturasFromCSV();
    const productosData = await loadProductosFromCSV();
    const telefonosData = await loadTelefonosFromCSV();
    
    for (const cliente of clientesData) {
      await session.run(
        `CREATE (c:Cliente {nro_cliente: $nro_cliente, nombre: $nombre, apellido: $apellido, direccion: $direccion, activo: $activo})`,
        cliente
      );
    }

    for (const telefono of telefonosData) {
      await session.run(
        'CREATE (t:Telefono {codigo_area: $codigo_area, nro_cliente: $nro_cliente, nro_telefono: $nro_telefono, tipo: $tipo})',
        telefono
      );

      await session.run(
        'MATCH (c:Cliente {nro_cliente: $nro_cliente}), (t:Telefono {nro_cliente: $nro_cliente}) CREATE (c)-[:TIENE_TELEFONO]->(t)',
        telefono
      );
    }

    for (const factura of facturasData) {
      await session.run(
        'CREATE (f:Factura {nro_factura: $nro_factura, nro_cliente: $nro_cliente, fecha: $fecha, total_sin_iva: $total_sin_iva, iva: $iva, total_con_iva: $total_con_iva})',
        factura
      );

      await session.run(
        'MATCH (c:Cliente {nro_cliente: $nro_cliente}), (f:Factura {nro_factura: $nro_factura}) CREATE (c)-[:TIENE_FACTURA]->(f)',
        factura
      );
    }
    
    for (const detalleFactura of detalleFacturaData) {
      await session.run(
        'CREATE (df:DetalleFactura {nro_factura: $nro_factura, codigo_producto: $codigo_producto, nro_item: $nro_item, cantidad: $cantidad})',
        detalleFactura
      );

      await session.run(
        'MATCH (f:Factura {nro_factura: $nro_factura}), (df:DetalleFactura {nro_factura: $nro_factura, codigo_producto: $codigo_producto, nro_item: $nro_item, cantidad: $cantidad}) CREATE (f)-[:TIENE_DETALLE_FACTURA]->(df)',
        detalleFactura
      );
    }
    
    for (const producto of productosData) {
      await session.run(
        'CREATE (p:Producto {codigo_producto: $codigo_producto, marca: $marca, nombre: $nombre, descripcion: $descripcion, precio: $precio, stock: $stock})',
        producto
      );

      await session.run(
        'MATCH (p:Producto {codigo_producto: $codigo_producto}), (df:DetalleFactura {codigo_producto: $codigo_producto}) CREATE (df)-[:TIENE_PRODUCTO]->(p)',
        producto
      );
    }
    
    console.log('✅ Base de datos inicializada con éxito');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  } finally {
    if (session) await session.close();
    if (driver) await driver.close();
    console.log('👋 Conexión con Neo4j cerrada');
  }
}

async function initializeDatabases() {
  try {
    await seedMongoDatabase(); 
    await seedNeo4jDatabase();
    console.log('✅ Proceso de inicialización completado');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    process.exit(1);
  }
}

initializeDatabases();