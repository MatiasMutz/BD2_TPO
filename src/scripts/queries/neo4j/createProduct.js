const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function createProduct(codigo_producto, nombre, marca, descripcion, precio, stock) {
  console.log('\n🔍 Creando un nuevo producto...');
  
  let session, driver;
  
  try {
    const connection = await connectNeo4jDatabase();
    session = connection.session;
    driver = connection.driver;

    const result = await session.run(`
      CREATE (p:Producto {
        codigo_producto: $codigo_producto,
        nombre: $nombre,
        marca: $marca,
        descripcion: $descripcion,
        precio: $precio,
        stock: $stock
      })
      RETURN p as nuevoProducto
    `, {
      codigo_producto: parseInt(codigo_producto),
      nombre,
      marca,
      descripcion,
      precio: parseInt(precio),
      stock: parseInt(stock)
    });

    if (result.records.length > 0) {
      const nuevoProducto = result.records[0].get('nuevoProducto').properties;
      console.log('✅ Producto creado exitosamente:', nuevoProducto);
    }

  } catch (error) {
    console.error('❌ Error al crear el producto:', error);
  } finally {
    if (session) await session.close();
    if (driver) await driver.close();
  }
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length !== 6) {
  console.error('❌ Se requieren 6 argumentos: codigo_producto, nombre, marca, descripcion, precio, stock');
  process.exit(1);
}

const [codigo_producto, nombre, marca, descripcion, precio, stock] = args;

createProduct(codigo_producto, nombre, marca, descripcion, precio, stock); 