const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getPhonesWithClientsData() {
    console.log('\n🔍 Buscando teléfonos con sus datos de cliente...');
    
    try {
        const session = await connectNeo4jDatabase();

        const result = await session.run(`
            MATCH (c:Cliente)-[:TIENE]->(t:Telefono)
            RETURN t, c
        `);

        if (result.records.length === 0) {
            console.log('\n❌ No se encontraron teléfonos');
            return;
        }

        result.records.forEach(record => {
            const telefono = record.get('t').properties;
            const cliente = record.get('c').properties;

            console.log(`📞 Teléfono: ${telefono.nro_telefono}`);
            console.log(`👤 Nombre: ${cliente.nombre} ${cliente.apellido} (${cliente.activo})`);
            console.log(`📍 Dirección: ${cliente.direccion}`);
            console.log('------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

getPhonesWithClientsData();