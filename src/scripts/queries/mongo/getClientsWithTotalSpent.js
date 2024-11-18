const mongoose = require('mongoose');
const Cliente = require('../../../models/clienteModel');
const Factura = require('../../../models/facturaModel');
require('dotenv').config();

async function getClientsWithTotalSpent(){
    console.log('\n🔍 Buscando clientes con su gasto total...');
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
                $addFields: {
                  totalFacturas: {
                    $cond: {
                      if: { $gt: [{ $size: "$facturas" }, 0] },
                      then: {
                        $round: [ 
                            { $sum: "$facturas.total_con_iva" }, 
                            2 
                        ]
                    },
                      else: 0
                    }
                  }
                }
              },
              {
                $sort: {
                    totalFacturas: -1  
                }
            }
        ]);

        if (!clientes.length) {
            console.log('❌ Error');
            return;
        }
        console.log('--------------------------');
        clientes.forEach(cliente => {
            console.log(`👤 ${cliente.nombre} ${cliente.apellido}`);
            console.log(`Total: $${cliente.totalFacturas}`);
        });
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}
getClientsWithTotalSpent();