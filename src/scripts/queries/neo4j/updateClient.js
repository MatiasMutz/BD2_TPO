const neo4j = require('neo4j-driver');
require('dotenv').config();

async function updateClient(nro_cliente, updates) {
  console.log('\n🔍 Modificando cliente...');
  
  try {
    const session = await connectNeo4jDatabase();

    const checkResult = await session.run(`
      MATCH (c:Cliente {nro_cliente: $nro_cliente})
      RETURN c
    `, {
      nro_cliente: parseInt(nro_cliente)
    });

    if (checkResult.records.length === 0) {
      console.log(`❌ No se encontró el cliente con el número ${nro_cliente}`);
      return;
    }

    const setClause = Object.entries(updates)
      .map(([key, value]) => `c.${key} = $${key}`)
      .join(', ');

    const result = await session.run(`
      MATCH (c:Cliente {nro_cliente: $nro_cliente})
      SET ${setClause}
      RETURN c as clienteModificado
    `, {
      nro_cliente: parseInt(nro_cliente),
      ...updates
    });

    if (result.records.length > 0) {
      const clienteModificado = result.records[0].get('clienteModificado').properties;
      console.log('✅ Cliente modificado exitosamente:', clienteModificado);
    } else {
      console.log('⚠️ No se realizaron cambios en el cliente');
    }

  } catch (error) {
    console.error('❌ Error al modificar el cliente:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('❌ Se requiere al menos 2 argumentos: nro_cliente y al menos un campo a modificar');
  process.exit(1);
}

const [id, ...fields] = args;

const updates = {};
fields.forEach(field => {
  const [key, value] = field.split('=');
  updates[key] = isNaN(value) ? value : parseInt(value);
});

updateClient(id, updates); 