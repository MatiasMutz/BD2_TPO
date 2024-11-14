const mongoose = require('mongoose');
const Cliente = require('../../models/clienteModel');
const Factura = require('../../models/facturaModel');
const Telefono = require('../../models/telefonoModel');
require('dotenv').config();

async function getClientsWithoutBills() {
    console.log('\n🔍 Buscando clientes sin facturas...');
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
                    facturas: { $size: 0 }
                }
            },
        ]);

        if (!clientes.length) {
            console.log('✅ Todos los clientes tienen facturas');
            return;
        }

        console.log(`📋 Se encontraron ${clientes.length} clientes sin facturas:\n\n`);

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

getClientsWithoutBills();