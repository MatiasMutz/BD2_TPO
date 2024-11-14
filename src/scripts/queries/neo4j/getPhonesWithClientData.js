const mongoose = require('mongoose');
const Cliente = require('../../../models/clienteModel');
const Telefono = require('../../../models/telefonoModel');
require('dotenv').config();

async function getPhonesWithClientsData() {
    console.log('\n🔍 Buscando telefonos con sus datos de cliente...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const telefonos = await Telefono.aggregate([
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
                    'cliente': { $ne: [] }         
                }
            }
        ]);
      
        if (telefonos.length === 0) {
            console.log('\n❌ No se encontraron teléfonos');
            return;
        }
      
        telefonos.forEach(telefono => {
            console.log(`📞 Teléfono: ${telefono.nro_telefono}`);
            console.log(`👤 Nombre: ${telefono.cliente[0].nombre} ${telefono.cliente[0].apellido} (${telefono.cliente[0].activo})`);
            console.log(`📍 Dirección: ${telefono.cliente[0].direccion}`);
            console.log('------------------------');
        });
      
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }

}
getPhonesWithClientsData();