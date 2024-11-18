const neo4j = require('neo4j-driver');
require('dotenv').config();

async function getClientsWithBills() {
    console.log('\n🔍 Buscando clientes con facturas...');
    
    try {
        const session = await connectNeo4jDatabase();

        const result = await session.run(`
            MATCH (c:Cliente)-[:TIENE_FACTURA]->(f:Factura)
            WITH c, collect(f) as facturas
            WHERE size(facturas) > 0
            RETURN c
        `);

        if (result.records.length === 0) {
            console.log('❌ No hay clientes con facturas');
            return;
        }

        console.log(`📋 Se encontraron ${result.records.length} clientes con facturas:\n\n`);
        console.log('--------------------------');
        
        result.records.forEach(record => {
            const cliente = record.get('c').properties;
            console.log(`👤 ${cliente.nombre} ${cliente.apellido}`);
            console.log(`📄 Número de cliente: ${cliente.nro_cliente}`);
            console.log(`📍 Dirección: ${cliente.direccion}`);
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

getClientsWithBills();