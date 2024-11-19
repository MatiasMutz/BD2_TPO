const neo4j = require('neo4j-driver');
require('dotenv').config();
const { connectNeo4jDatabase } = require('../../../utils/dataLoader');

async function getKaiBullockBills() {
    console.log('\n🔍 Obteniendo facturas de Kai Bullock...');
    
    try {
        const session = await connectNeo4jDatabase();

        const result = await session.run(`
            MATCH (c:Cliente {nombre: 'Kai', apellido: 'Bullock'})-[:TIENE_FACTURA]->(f:Factura)
            RETURN f
        `);

        if (result.records.length === 0) {
            console.log('❌ No se encontraron facturas de Kai Bullock');
            return;
        }

        console.log(`📋 Se encontraron ${result.records.length} facturas de Kai Bullock\n\n`);
        
        console.log('--------------------------');
        result.records.forEach(record => {
            const factura = record.get('f').properties;
            console.log(`📄 Número de factura: ${factura.nro_factura}`);
            console.log(`📅 Fecha: ${factura.fecha}`);
            console.log(`💵 Total sin IVA: ${factura.total_sin_iva}`);
            console.log(`💵 Total con IVA: ${factura.total_con_iva}`);
            console.log(`💰 IVA: ${factura.iva}`);
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

getKaiBullockBills(); 