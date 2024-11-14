const mongoose = require('mongoose');
const Cliente = require('../../models/clienteModel');
require('dotenv').config();

async function createClient(nro_cliente, nombre, apellido, direccion, activo) {
    console.log('\n🔍 Creando un nuevo cliente...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const nuevoCliente = new Cliente({
            nro_cliente,
            nombre,
            apellido,
            direccion,
            activo
        });

        await nuevoCliente.save();
        console.log('✅ Cliente creado exitosamente:', nuevoCliente);

    } catch (error) {
        console.error('❌ Error al crear el cliente:', error);
    } finally {
        await mongoose.connection.close();
    }
}

const args = process.argv.slice(2);
if (args.length !== 5) {
    console.error('❌ Se requieren 5 argumentos: nro_cliente, nombre, apellido, direccion, activo');
    process.exit(1);
}

const [nro_cliente, nombre, apellido, direccion, activo] = args;

createClient(parseInt(nro_cliente), nombre, apellido, direccion, parseInt(activo)); 