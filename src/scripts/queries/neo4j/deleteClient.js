const neo4j = require('neo4j-driver');
require('dotenv').config();

async function deleteClient(nro_cliente) {
  console.log('\n🔍 Eliminando cliente...');
  
  try {
    const session = await connectNeo4jDatabase();

    const result = await session.run(`
      MATCH (c:Cliente {nro_cliente: $nro_cliente})
      OPTIONAL MATCH (c)-[r]-()
      DELETE r, c
      RETURN count(c) as deletedCount
    `, {
      nro_cliente: parseInt(nro_cliente)
    });

    const deletedCount = result.records[0].get('deletedCount').low;

    if (deletedCount === 0) {
      console.log('❌ No se encontró el cliente con el número proporcionado');
    } else {
      console.log('✅ Cliente eliminado exitosamente');
    }

  } catch (error) {
    console.error('❌ Error al eliminar el cliente:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('❌ Se requiere 1 argumento: nro_cliente');
  process.exit(1);
}

const [nro_cliente] = args;

deleteClient(nro_cliente); 