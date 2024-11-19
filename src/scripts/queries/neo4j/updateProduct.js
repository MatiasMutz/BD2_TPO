const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('./../utils/dataLoader');

async function updateProduct(codigo_producto, updates) {
  console.log('\n🔍 Modificando producto...');
  
  try {
    const session = await connectNeo4jDatabase();

    const checkResult = await session.run(`
      MATCH (p:Producto {codigo_producto: $codigo_producto})
      RETURN p
    `, {
      codigo_producto: parseInt(codigo_producto)
    });

    if (checkResult.records.length === 0) {
      console.log(`❌ No se encontró el producto con el código ${codigo_producto}`);
      return;
    }

    const setClause = Object.entries(updates)
      .map(([key, value]) => `p.${key} = $${key}`)
      .join(', ');

    const result = await session.run(`
      MATCH (p:Producto {codigo_producto: $codigo_producto})
      SET ${setClause}
      RETURN p as productoModificado
    `, {
      codigo_producto: parseInt(codigo_producto),
      ...updates
    });

    if (result.records.length > 0) {
      const productoModificado = result.records[0].get('productoModificado').properties;
      console.log('✅ Producto modificado exitosamente:', productoModificado);
    } else {
      console.log('⚠️ No se realizaron cambios en el producto');
    }

  } catch (error) {
    console.error('❌ Error al modificar el producto:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('❌ Se requiere al menos 2 argumentos: codigo_producto y al menos un campo a modificar');
  process.exit(1);
}

const [id, ...fields] = args;

const updates = {};
fields.forEach(field => {
  const [key, value] = field.split('=');
  updates[key] = isNaN(value) ? value : parseInt(value);
});

updateProduct(id, updates); 