const fs = require('fs');

const { loadClientesFromCSV, loadDetalleFacturaFromCSV, loadFacturasFromCSV, loadProductosFromCSV, loadTelefonosFromCSV } = require('./utils/dataLoader');

function cleanFiles() {
    fs.writeFileSync('1_constraints.cypher', '');
    fs.writeFileSync('2_clients.cypher', '');
    fs.writeFileSync('3_phones.cypher', '');
    fs.writeFileSync('4_invoices.cypher', '');
    fs.writeFileSync('5_invoice_details.cypher', '');
    fs.writeFileSync('6_products.cypher', '');
}

function createConstraints() {
    fs.appendFileSync('1_constraints.cypher', `CREATE CONSTRAINT FOR (c:Cliente) REQUIRE c.nro_cliente IS UNIQUE;\n`);
    fs.appendFileSync('1_constraints.cypher', `CREATE CONSTRAINT FOR (t:Telefono) REQUIRE t.nro_cliente IS UNIQUE;\n`);
    fs.appendFileSync('1_constraints.cypher', `CREATE CONSTRAINT FOR (f:Factura) REQUIRE f.nro_factura IS UNIQUE;\n`);
    fs.appendFileSync('1_constraints.cypher', `CREATE CONSTRAINT FOR (p:Producto) REQUIRE p.codigo_producto IS UNIQUE;\n`);
}

function createClient(nro_cliente, nombre, apellido, direccion, activo) {
    fs.appendFileSync('2_clients.cypher', `CREATE (c:Cliente {nro_cliente: ${nro_cliente}, nombre: "${nombre}", apellido: "${apellido}", direccion: "${direccion}", activo: ${activo}});\n`);
}

function createTelefono(nro_cliente, codigo_area, nro_telefono, tipo) {
    fs.appendFileSync('3_phones.cypher', `CREATE (t:Telefono {codigo_area: ${codigo_area}, nro_cliente: ${nro_cliente}, nro_telefono: ${nro_telefono}, tipo: "${tipo}"});\n`);
    fs.appendFileSync('3_phones.cypher', `MATCH (c:Cliente {nro_cliente: ${nro_cliente}}), (t:Telefono {nro_cliente: ${nro_cliente}}) CREATE (c)-[:TIENE_TELEFONO]->(t);\n`);
}

function createFactura(nro_factura, nro_cliente, fecha, total_sin_iva, iva, total_con_iva) {
    fs.appendFileSync('4_invoices.cypher', `CREATE (f:Factura {nro_factura: ${nro_factura}, nro_cliente: ${nro_cliente}, fecha: "${fecha}", total_sin_iva: ${total_sin_iva}, iva: ${iva}, total_con_iva: ${total_con_iva}});\n`);
    fs.appendFileSync('4_invoices.cypher', `MATCH (c:Cliente {nro_cliente: ${nro_cliente}}), (f:Factura {nro_factura: ${nro_factura}}) CREATE (c)-[:TIENE_FACTURA]->(f);\n`);
}

function createDetalleFactura(nro_factura, codigo_producto, nro_item, cantidad) {
    fs.appendFileSync('5_invoice_details.cypher', `CREATE (df:DetalleFactura {nro_factura: ${nro_factura}, codigo_producto: ${codigo_producto}, nro_item: ${nro_item}, cantidad: ${cantidad}});\n`);
    fs.appendFileSync('5_invoice_details.cypher', `MATCH (f:Factura {nro_factura: ${nro_factura}}), (df:DetalleFactura {nro_factura: ${nro_factura}, codigo_producto: ${codigo_producto}, nro_item: ${nro_item}, cantidad: ${cantidad}}) CREATE (f)-[:TIENE_DETALLE_FACTURA]->(df);\n`);
}

function createProducto(codigo_producto, marca, nombre, descripcion, precio, stock) {
    fs.appendFileSync('6_products.cypher', `CREATE (p:Producto {codigo_producto: ${codigo_producto}, marca: "${marca}", nombre: "${nombre}", descripcion: "${descripcion}", precio: ${precio}, stock: ${stock}});\n`);
    fs.appendFileSync('6_products.cypher', `MATCH (p:Producto {codigo_producto: ${codigo_producto}}), (df:DetalleFactura {codigo_producto: ${codigo_producto}}) CREATE (df)-[:TIENE_PRODUCTO]->(p);\n`);

}

async function seedDatabase() {
    console.log('🚀 Iniciando inicialización de la base de datos');

    const clientesData = await loadClientesFromCSV();
    const telefonosData = await loadTelefonosFromCSV();
    const facturasData = await loadFacturasFromCSV();
    const detalleFacturaData = await loadDetalleFacturaFromCSV();
    const productosData = await loadProductosFromCSV();

    cleanFiles();

    createConstraints();

    for (const cliente of clientesData) {
        createClient(cliente.nro_cliente, cliente.nombre, cliente.apellido, cliente.direccion, cliente.activo);
    }

    for (const telefono of telefonosData) {
        createTelefono(telefono.nro_cliente, telefono.codigo_area, telefono.nro_telefono, telefono.tipo);
    }

    for (const factura of facturasData) {
        createFactura(factura.nro_factura, factura.nro_cliente, factura.fecha, factura.total_sin_iva, factura.iva, factura.total_con_iva);
    }

    for (const detalleFactura of detalleFacturaData) {
        createDetalleFactura(detalleFactura.nro_factura, detalleFactura.codigo_producto, detalleFactura.nro_item, detalleFactura.cantidad);
    }

    for (const producto of productosData) {
        createProducto(producto.codigo_producto, producto.marca, producto.nombre, producto.descripcion, producto.precio, producto.stock);
    }

    console.log('✅ Base de datos inicializada con éxito');
}

seedDatabase();