const mongoose = require('mongoose');
const Cliente = require('../../../models/clienteModel');
require('dotenv').config();

async function getClientsWithBillsCount() {
    console.log('\n🔍 Obteniendo clientes con su cantidad de facturas...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const clientes = await Cliente.aggregate([
            {
                $lookup: {
                    from: 'facturas',
                    localField: 'nro_cliente',
                    foreignField: 'nro_cliente',
                    as: 'facturas'
                }
            },
            {
                $project: {
                    _id: 0,
                    nro_cliente: 1,
                    nombre: 1,
                    apellido: 1,
                    cantidad_facturas: { $size: '$facturas' }
                }
            },
            {
                $sort: {
                    cantidad_facturas: -1
                }
            }
        ]);

        if (!clientes.length) {
            console.log('❌ No se encontraron clientes');
            return;
        }

        console.log(`📋 Se encontraron ${clientes.length} clientes\n\n`);
        
        console.log('--------------------------');
        clientes.forEach(cliente => {
            console.log(`👤 ${cliente.apellido}, ${cliente.nombre}`);
            console.log(`📊 Cantidad de facturas: ${cliente.cantidad_facturas}`);
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

getClientsWithBillsCount(); 