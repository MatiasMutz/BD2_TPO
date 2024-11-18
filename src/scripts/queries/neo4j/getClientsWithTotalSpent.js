const neo4j = require('neo4j-driver');
require('dotenv').config();

async function getClientsWithTotalSpent() {
  console.log('\n🔍 Buscando clientes con su gasto total...');
  
  try {
    const session = await connectNeo4jDatabase();

    const result = await session.run(`
      MATCH (c:Cliente)-[:TIENE_FACTURA]->(f:Factura)
      WITH c, collect(f) as facturas, sum(f.total_con_iva) as totalFacturas
      RETURN c, totalFacturas
      ORDER BY totalFacturas DESC
    `);

    if (result.records.length === 0) {
      console.log('❌ No se encontraron clientes con facturas');
      return;
    }

    console.log('--------------------------');
    result.records.forEach(record => {
      const cliente = record.get('c').properties;
      const totalFacturas = record.get('totalFacturas');
      
      console.log(`👤 ${cliente.nombre} ${cliente.apellido}`);
      console.log(`Total: $${totalFacturas.toFixed(2)}`);
      console.log('--------------------------');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

getClientsWithTotalSpent();