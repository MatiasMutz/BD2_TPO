const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getBillsWithIpsumProducts() {
  console.log('\n🔍 Obteniendo facturas con productos Ipsum...');
  
  try {
    const session = await connectNeo4jDatabase();

    const result = await session.run(`
      MATCH (f:Factura)-[:CONTIENE]->(p:Producto)
      WHERE p.marca = 'Ipsum'
      RETURN f, collect(p) as productos
    `);

    if (result.records.length === 0) {
      console.log('❌ No se encontraron facturas con productos Ipsum');
      return;
    }

    console.log(`📋 Se encontraron ${result.records.length} facturas con productos Ipsum\n\n`);
    console.log("--------------------------");

    result.records.forEach(record => {
      const factura = record.get('f').properties;
      
      console.log(`📄 Número de factura: ${factura.nro_factura}`);
      console.log(`📅 Fecha: ${factura.fecha}`);
      console.log(`💵 Total sin IVA: ${factura.total_sin_iva}`);
      console.log(`💵 Total con IVA: ${factura.total_con_iva}`);
      console.log(`💰 IVA: ${factura.iva}`);
      console.log("--------------------------");
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

getBillsWithIpsumProducts();
