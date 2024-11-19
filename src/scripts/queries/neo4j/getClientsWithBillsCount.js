const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getClientsWithBillsCount() {
    console.log('\n🔍 Obteniendo clientes con su cantidad de facturas...');
    
    let session, driver;
    
    try {
        const connection = await connectNeo4jDatabase();
        session = connection.session;
        driver = connection.driver;

        const result = await session.run(`
            MATCH (c:Cliente)
            OPTIONAL MATCH (c)-[:TIENE_FACTURA]->(f:Factura)
            WITH c, count(f) as cantidad_facturas
            RETURN c.nombre as nombre, c.apellido as apellido, 
                   c.nro_cliente as nro_cliente, cantidad_facturas
            ORDER BY cantidad_facturas DESC
        `);

        if (result.records.length === 0) {
            console.log('❌ No se encontraron clientes');
            return;
        }

        console.log(`📋 Se encontraron ${result.records.length} clientes\n\n`);
        console.log('--------------------------');
        
        result.records.forEach(record => {
            console.log(`👤 ${record.get('apellido')}, ${record.get('nombre')}`);
            console.log(`📊 Cantidad de facturas: ${record.get('cantidad_facturas').low}`);
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (session) await session.close();
        if (driver) await driver.close();
    }
}

getClientsWithBillsCount(); 