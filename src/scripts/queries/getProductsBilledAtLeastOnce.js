const mongoose = require('mongoose');
const Factura = require('../../models/detalleFacturaModel');
const Producto = require('../../models/productoModel');
require('dotenv').config();

async function getProductsBilledAtLeastOnce() {
    console.log('\n🔍 Buscando productos con por lo menos una factura...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const productos = await Producto.aggregate([
            {
                $lookup: {
                    from: 'detallefacturas',
                    localField: 'codigo_producto',
                    foreignField: 'codigo_producto',
                    as: 'detallefacturas'
                }
            },
            {
                $match: {
                    detalleFacturas: {  $not: { $size: 0 } }
                }
            },
        ]);

        if (!productos.length) {
            console.log('✅ No hay ningun producto con factura');
            return;
        }

        console.log(`📋 Se encontraron ${productos.length} facturados al menos una vez:\n\n`);

        console.log('--------------------------');
        productos.forEach(producto => {
            console.log(`${producto.nombre}`);
            
            console.log('--------------------------');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
    
}
getProductsBilledAtLeastOnce();