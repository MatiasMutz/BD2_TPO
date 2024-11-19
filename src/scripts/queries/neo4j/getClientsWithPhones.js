const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getClientesConTelefonos() {
  console.log('\n🔍 Buscando clientes con sus telefonos...');
  
  try {
    const session = await connectNeo4jDatabase();

    const result = await session.run(`
      MATCH (c:Cliente)-[:TIENE]->(t:Telefono)
      RETURN c, collect(t) as telefonos
    `);

    if (result.records.length === 0) {
      console.log('\n❌ No se encontraron clientes con teléfonos');
      return;
    }

    result.records.forEach(record => {
      const cliente = record.get('c').properties;
      const telefonos = record.get('telefonos').map(t => t.properties);

      console.log(`👤 ${cliente.nombre} ${cliente.apellido} (${cliente.activo})`);
      console.log(`📍 Dirección: ${cliente.direccion}`);
      telefonos.forEach(telefono => {
        console.log(`📞 Teléfono: (${telefono.codigo_area}) ${telefono.nro_telefono} (${telefono.tipo})`);
      });
      console.log('------------------------');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
  }
}

getClientesConTelefonos();