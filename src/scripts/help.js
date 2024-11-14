const commands = {
  "test-mongo-connection": "Prueba la conexión con MongoDB",
  "clean": "Resetea la base de datos con los datos de los CSV originales",
  "m-CT": "Obtener los datos de los clientes junto con sus teléfonos utilizando mongoDB",
  "m-JC": "Obtener los teléfonos y el número de cliente de Jacob Cooper utilizando mongoDB",
  /*
  "clients:jacob": "Obtener teléfonos del cliente Jacob Cooper",
  "clients:all-phones": "Mostrar cada teléfono junto con los datos del cliente",
  "clients:with-invoices": "Obtener clientes con al menos una factura",
  "clients:no-invoices": "Identificar clientes sin facturas",
  "clients:invoice-count": "Mostrar clientes con cantidad de facturas",
  "invoices:kai": "Listar facturas de Kai Bullock",
  "invoices:by-date": "Ver facturas ordenadas por fecha",
  "invoices:ipsum": "Listar facturas con productos Ipsum",
  "products:invoiced": "Ver productos facturados al menos una vez",
  "products:not-invoiced": "Ver productos no facturados",
  "reports:client-spending": "Ver gasto total por cliente con IVA"
  */
};

console.log('\n🚀 Comandos disponibles:\n');

Object.entries(commands).forEach(([command, description]) => {
  console.log(`📋 npm run ${command.padEnd(25)} - ${description}`);
});

console.log('\n'); 