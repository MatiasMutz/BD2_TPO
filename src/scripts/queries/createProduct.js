const mongoose = require('mongoose');
const Producto = require('../../models/productoModel');
require('dotenv').config();

async function createProduct(codigo_producto, nombre, marca, descripcion, precio, stock) {
    console.log('\n🔍 Creando un nuevo producto...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const nuevoProducto = new Producto({
            codigo_producto,
            nombre,
            marca,
            descripcion,
            precio,
            stock
        });

        await nuevoProducto.save();
        console.log('✅ Producto creado exitosamente:', nuevoProducto);

    } catch (error) {
        console.error('❌ Error al crear el producto:', error);
    } finally {
        await mongoose.connection.close();
    }
}

const args = process.argv.slice(2);
if (args.length !== 6) {
    console.error('❌ Se requieren 6 argumentos: nro_producto, nombre, marca, descripcion, precio, stock');
    process.exit(1);
}

const [codigo_producto, nombre, marca, descripcion, precio, stock] = args;

createProduct(parseInt(codigo_producto), nombre, marca, descripcion, parseInt(precio), parseInt(stock)); 