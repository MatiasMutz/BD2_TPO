const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getJacobCopperData() {
    console.log('\n🔍 Buscando datos de Jacob Cooper...');
    
    try {
        const session = await connectNeo4jDatabase();

        const result = await session.run(`
            MATCH (c:Cliente {nombre: 'Jacob', apellido: 'Cooper'})-[:TIENE]->(t:Telefono)
            RETURN c, collect(t) as telefonos
        `);

        if (result.records.length === 0) {
            console.log('❌ No se encontró el cliente Jacob Cooper');
            return;
        }

        const cliente = result.records[0].get('c').properties;
        const telefonos = result.records[0].get('telefonos').map(t => t.properties);

        console.log(`👤 ${cliente.nombre} ${cliente.apellido}`);
        console.log(`📄 Número de cliente: ${cliente.nro_cliente}`);
        console.log(`📍 Dirección: ${cliente.direccion}`);
        telefonos.forEach(telefono => {
            console.log(`📞 Teléfono: (${telefono.codigo_area}) ${telefono.nro_telefono} (${telefono.tipo})`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

getJacobCopperData();
