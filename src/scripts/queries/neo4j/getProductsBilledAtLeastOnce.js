const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getProductsBilledAtLeastOnce() {
    console.log('\n🔍 Buscando productos con por lo menos una factura...');
    
    try {
        const session = await connectNeo4jDatabase();

        const result = await session.run(`
            MATCH (p:Producto)<-[:INCLUYE]-(df:DetalleFactura)
            RETURN DISTINCT p
        `);

        if (result.records.length === 0) {
            console.log('✅ No hay ningun producto con factura');
            return;
        }

        console.log(`📋 Se encontraron ${result.records.length} facturados al menos una vez:\n\n`);
        
        console.log('--------------------------');
        result.records.forEach(record => {
            const producto = record.get('p').properties;
            console.log(`${producto.nombre}`);
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

getProductsBilledAtLeastOnce();