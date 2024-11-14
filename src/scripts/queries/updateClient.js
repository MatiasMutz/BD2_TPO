const mongoose = require('mongoose');
const Cliente = require('../../models/clienteModel');
require('dotenv').config();

async function updateClient(nro_cliente, updates) {
    console.log('\n🔍 Modificando cliente...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Verificar si el cliente existe antes de intentar actualizarlo
        const clienteExistente = await Cliente.findOne({ nro_cliente });
        
        if (!clienteExistente) {
            console.log(`❌ No se encontró el cliente con el número ${nro_cliente}`);
            return;
        }

        const result = await Cliente.updateOne(
            { nro_cliente },
            { $set: updates }
        );

        if (result.modifiedCount > 0) {
            const clienteModificado = await Cliente.findOne({ nro_cliente });
            console.log('✅ Cliente modificado exitosamente:', clienteModificado);
        } else {
            console.log('⚠️ No se realizaron cambios en el cliente');
        }

    } catch (error) {
        console.error('❌ Error al modificar el cliente:', error);
    } finally {
        await mongoose.connection.close();
    }
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('❌ Se requiere al menos 2 argumentos: nro_cliente y al menos un campo a modificar');
    process.exit(1);
}

const [id, ...fields] = args;

// Convertir los campos a un objeto de actualizaciones
const updates = {};
fields.forEach(field => {
    const [key, value] = field.split('=');
    updates[key] = isNaN(value) ? value : parseInt(value);
});

updateClient(id, updates); 