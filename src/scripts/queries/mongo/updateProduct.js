const mongoose = require('mongoose');
const Producto = require('../../../models/productoModel');
require('dotenv').config();

async function updateProduct(codigo_producto, updates) {
    console.log('\n🔍 Modificando producto...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Verificar si el cliente existe antes de intentar actualizarlo
        const productoExistente = await Producto.findOne({ codigo_producto });
        
        if (!productoExistente) {
            console.log(`❌ No se encontró el producto con el número ${codigo_producto}`);
            return;
        }

        const result = await Producto.updateOne(
            { codigo_producto },
            { $set: updates }
        );

        if (result.modifiedCount > 0) {
            const productoModificado = await Producto.findOne({ codigo_producto });
            console.log('✅ Producto modificado exitosamente:', productoModificado);
        } else {
            console.log('⚠️ No se realizaron cambios en el producto');
        }

    } catch (error) {
        console.error('❌ Error al modificar el producto:', error);
    } finally {
        await mongoose.connection.close();
    }
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('❌ Se requiere al menos 2 argumentos: nro_producto y al menos un campo a modificar');
    process.exit(1);
}

const [id, ...fields] = args;

// Convertir los campos a un objeto de actualizaciones
const updates = {};
fields.forEach(field => {
    const [key, value] = field.split('=');
    updates[key] = isNaN(value) ? value : parseInt(value);
});

updateProduct(id, updates); 