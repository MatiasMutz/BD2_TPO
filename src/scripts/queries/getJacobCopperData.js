const mongoose = require('mongoose');
const Cliente = require('../../models/clienteModel');
const Telefono = require('../../models/telefonoModel');
require('dotenv').config();

async function getJacobCopperData() {
    console.log('\n🔍 Buscando datos de Jacob Cooper...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const cliente = await Cliente.aggregate([
            {
                $match: {
                    nombre: 'Jacob',
                    apellido: 'Cooper'
                }
            },
            {
                $lookup: {
                    from: 'telefonos',
                    localField: 'nro_cliente',
                    foreignField: 'nro_cliente',
                    as: 'telefonos'
                }
            }
        ]);

        if (!cliente.length) {
            console.log('❌ No se encontró el cliente Jacob Cooper');
            return;
        }

        const clienteData = cliente[0];
        console.log(`👤 ${clienteData.nombre} ${clienteData.apellido}`);
        console.log(`📄 Número de cliente: ${clienteData.nro_cliente}`);
        console.log(`📍 Dirección: ${clienteData.direccion}`);
        clienteData.telefonos.forEach(telefono => {
            console.log(`📞 Teléfono: (${telefono.codigo_area}) ${telefono.nro_telefono} (${telefono.tipo})`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

getJacobCopperData();
