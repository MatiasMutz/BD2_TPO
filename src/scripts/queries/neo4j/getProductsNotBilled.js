const mongoose = require('mongoose');
require('dotenv').config();

async function createProductsNotBilledView() {
    console.log('\n🔍 Creando vista de productos no facturados...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection.db;

        try {
            await db.dropCollection('vista_productos_no_facturados');
            console.log('🗑️ Vista anterior eliminada');
        } catch (e) {
            // Si la vista no existe, simplemente continuamos
        }

        await db.createCollection('vista_productos_no_facturados', {
            viewOn: 'productos',
            pipeline: [
                {
                    $lookup: {
                        from: 'detallefacturas',
                        localField: 'codigo_producto',
                        foreignField: 'codigo_producto',
                        as: 'facturas'
                    }
                },
                {
                    $match: {
                        facturas: { $size: 0 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        codigo_producto: 1,
                        marca: 1,
                        nombre: 1,
                        descripcion: 1,
                        precio: 1,
                        stock: 1
                    }
                }
            ]
        });

        console.log('✅ Vista creada exitosamente');

        const resultados = await db.collection('vista_productos_no_facturados').find({}).toArray();

        if (!resultados.length) {
            console.log('❌ No se encontraron productos no facturados');
            return;
        }

        console.log(`📋 Se encontraron ${resultados.length} productos no facturados\n`);
        
        console.log('----------------------------');
        resultados.forEach(producto => {
            console.log(`🛒 Producto: ${producto.nombre}`);
            console.log(`🔖 Marca: ${producto.marca}`);
            console.log(`💲 Precio: $${producto.precio.toFixed(2)}`);
            console.log(`📦 Stock: ${producto.stock}`);
            console.log('----------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

createProductsNotBilledView(); 