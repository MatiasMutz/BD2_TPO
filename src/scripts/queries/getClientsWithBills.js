const mongoose = require('mongoose');
const Cliente = require('../../models/clienteModel');
const Factura = require('../../models/facturaModel');
const Telefono = require('../../models/telefonoModel');
require('dotenv').config();

async function getClientsWithBills() {
    console.log('\n🔍 Buscando clientes con facturas...');
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
                $match: {
                    'facturas': { $ne: [] }
                }
            },
        ]);

        if (!clientes.length) {
            console.log('❌ No hay clientes con facturas');
            return;
        }

        console.log(`📋 Se encontraron ${clientes.length} clientes con facturas:\n\n`);

        console.log('--------------------------');
        clientes.forEach(cliente => {
            console.log(`👤 ${cliente.nombre} ${cliente.apellido}`);
            console.log(`📄 Número de cliente: ${cliente.nro_cliente}`);
            console.log(`📍 Dirección: ${cliente.direccion}`);
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

getClientsWithBills();