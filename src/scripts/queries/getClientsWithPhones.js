const mongoose = require('mongoose');
const Cliente = require('../../models/clienteModel');
const Telefono = require('../../models/telefonoModel');
require('dotenv').config();

async function getClientesConTelefonos() {
  console.log('\n🔍 Buscando clientes con sus telefonos...');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const clientes = await Cliente.aggregate([
      {
        $lookup: {
          from: 'telefonos',
          localField: 'nro_cliente',
          foreignField: 'nro_cliente',
          as: 'telefonos'
        }
      },
      {
        $match: {
          'telefonos': { $ne: [] }
        }
      }
    ]);

    if (clientes.length === 0) {
      console.log('\n❌ No se encontraron clientes con teléfonos');
      return;
    }

    clientes.forEach(cliente => {
      console.log(`👤 ${cliente.nombre} ${cliente.apellido} (${cliente.activo})`);
      console.log(`📍 Dirección: ${cliente.direccion}`);
      cliente.telefonos.forEach(telefono => {
        console.log(`📞 Teléfono: (${telefono.codigo_area}) ${telefono.nro_telefono} (${telefono.tipo})`);
      });
      console.log('------------------------');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

getClientesConTelefonos();