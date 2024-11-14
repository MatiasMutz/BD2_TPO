const mongoose = require('mongoose');
require('dotenv').config();

async function createBillsOrderedByDateView() {
    console.log('\n🔍 Creando vista de facturas ordenadas por fecha...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection.db;

        try {
            await db.dropCollection('vista_facturas_ordenadas');
            console.log('🗑️ Vista anterior eliminada');
        } catch (e) {
            // Si la vista no existe, simplemente continuamos
        }

        await db.createCollection('vista_facturas_ordenadas', {
            viewOn: 'facturas',
            pipeline: [
                {
                    $lookup: {
                        from: 'clientes',
                        localField: 'nro_cliente',
                        foreignField: 'nro_cliente',
                        as: 'cliente'
                    }
                },
                {
                    $unwind: '$cliente'
                },
                {
                    $project: {
                        _id: 0,
                        nro_factura: 1,
                        fecha: 1,
                        total_sin_iva: 1,
                        iva: 1,
                        total_con_iva: 1,
                        'cliente.nombre': 1,
                        'cliente.apellido': 1
                    }
                },
                {
                    $sort: {
                        fecha: 1
                    }
                }
            ]
        });

        console.log('✅ Vista creada exitosamente');

        const resultados = await db.collection('vista_facturas_ordenadas').find({}).toArray();

        if (!resultados.length) {
            console.log('❌ No se encontraron facturas');
            return;
        }

        console.log(`📋 Se encontraron ${resultados.length} facturas\n`);
        
        console.log('----------------------------');
        resultados.forEach(factura => {
            console.log(`📅 Fecha: ${factura.fecha}`);
            console.log(`🧾 Número de factura: ${factura.nro_factura}`);
            console.log(`👤 Cliente: ${factura.cliente.nombre} ${factura.cliente.apellido}`);
            console.log(`💰 Total sin IVA: $${factura.total_sin_iva.toFixed(2)}`);
            console.log(`📊 IVA: $${factura.iva.toFixed(2)}`);
            console.log(`💵 Total con IVA: $${factura.total_con_iva.toFixed(2)}`);
            console.log('----------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

createBillsOrderedByDateView(); 