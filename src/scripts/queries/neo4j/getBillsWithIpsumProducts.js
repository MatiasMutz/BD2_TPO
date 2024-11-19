const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getBillsWithIpsumProducts() {
  console.log('\n🔍 Obteniendo facturas con productos Ipsum...');
  
  let session, driver;
  
  try {
    const connection = await connectNeo4jDatabase();
    session = connection.session;
    driver = connection.driver;

    const result = await session.run(`
      MATCH (f:Factura)-[:TIENE_PRODUCTO]->(p:Producto)
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
    if (session) await session.close();
    if (driver) await driver.close();
  }
}

getBillsWithIpsumProducts();
