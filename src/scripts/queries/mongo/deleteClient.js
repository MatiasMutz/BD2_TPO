const mongoose = require('mongoose');
const Cliente = require('../../../models/clienteModel');
require('dotenv').config();

async function deleteClient(nro_cliente) {
    console.log('\n🔍 Eliminando cliente...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const result = await Cliente.deleteOne({ nro_cliente });

        if (result.deletedCount === 0) {
            console.log('❌ No se encontró el cliente con el número proporcionado');
        } else {
            console.log('✅ Cliente eliminado exitosamente');
        }

    } catch (error) {
        console.error('❌ Error al eliminar el cliente:', error);
    } finally {
        await mongoose.connection.close();
    }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('❌ Se requiere 1 argumento: nro_cliente');
    process.exit(1);
}

const [nro_cliente] = args;

deleteClient(parseInt(nro_cliente)); 