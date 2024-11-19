const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');


async function createClient(nro_cliente, nombre, apellido, direccion, activo) {
  console.log('\n🔍 Creando un nuevo cliente...');
  
  try {
    const session = await connectNeo4jDatabase();

    const result = await session.run(`
      CREATE (c:Cliente {
        nro_cliente: $nro_cliente,
        nombre: $nombre,
        apellido: $apellido,
        direccion: $direccion,
        activo: $activo
      })
      RETURN c
    `, {
      nro_cliente: parseInt(nro_cliente),
      nombre,
      apellido,
      direccion,
      activo: parseInt(activo)
    });

    if (result.records.length > 0) {
      const nuevoCliente = result.records[0].get('c').properties;
      console.log('✅ Cliente creado exitosamente:', nuevoCliente);
    }

  } catch (error) {
    console.error('❌ Error al crear el cliente:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

const args = process.argv.slice(2);
if (args.length !== 5) {
  console.error('❌ Se requieren 5 argumentos: nro_cliente, nombre, apellido, direccion, activo');
  process.exit(1);
}

const [nro_cliente, nombre, apellido, direccion, activo] = args;

createClient(nro_cliente, nombre, apellido, direccion, activo); 