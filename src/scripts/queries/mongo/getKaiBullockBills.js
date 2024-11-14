const mongoose = require('mongoose');
const Factura = require('../../../models/facturaModel');
require('dotenv').config();

async function getClientsWithBillsCount() {
    console.log('\n🔍 Obteniendo clientes con su cantidad de facturas...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const facturas = await Factura.aggregate([
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'nro_cliente',
                    foreignField: 'nro_cliente',
                    as: 'cliente'
                }
            },
            {
                $match: {
                    'cliente.nombre': 'Kai',
                    'cliente.apellido': 'Bullock'
                }
            },
        ]);

        if (!facturas.length) {
            console.log('❌ No se encontraron facturas de Kai Bullock');
            return;
        }

        console.log(`📋 Se encontraron ${facturas.length} facturas de Kai Bullock\n\n`);
        
        console.log('--------------------------');
        facturas.forEach(factura => {
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
        await mongoose.connection.close();
    }
}

getClientsWithBillsCount(); 