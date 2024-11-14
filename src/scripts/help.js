const commands = {
  "test-mongo-connection": "Prueba la conexión con MongoDB",
  "clean": "Resetea la base de datos con los datos de los CSV originales",
  "m1": "Obtener los datos de los clientes junto con sus teléfonos utilizando mongoDB",
  "m2": "Obtener los teléfonos y el número de cliente de Jacob Cooper utilizando mongoDB",
  "m3": "Obtener los teléfonos junto con los datos del cliente utilizando mongoDB",
  "m4": "Obtener los clientes que tengan registrada al menos una factura utilizando mongoDB",
  "m5": "Obtener los clientes que no tengan registrada ninguna factura utilizando mongoDB",
  "m6": "Obtener los clientes junto con la cantidad de facturas que tienen utilizando mongoDB",
  "m7": "Obtener las facturas de Kai Bullock utilizando mongoDB",
  "m8": "Obtener los productos que han sido facturados al menos una vez utilizando mongoDB",
  "m9": "Obtener las facturas que contengan productos de las marcas Ipsum utilizando mongoDB",
  "m10": "Obtener los nombres y apellido de los clientes junto con su gasto total con IVA utilizando mongoDB",
  "m11": "Obtener una vista que devuelva los datos de las facturas ordenadas por fecha utilizando mongoDB",
  "m12": "Obtener una vista que devuelva todos los productos que aún no han sido facturados utilizando mongoDB",
  "m13.1": "Crear un nuevo cliente utilizando mongoDB",
  "m13.2": "Eliminar un cliente existente utilizando mongoDB",
  "m13.3": "Modificar un cliente existente utilizando mongoDB",
  "m14.1": "Crear un nuevo producto utilizando mongoDB",
  "m14.2": "Modificar un producto existente utilizando mongoDB"
};

console.log('\n🚀 Comandos disponibles:\n');

Object.entries(commands).forEach(([command, description]) => {
  console.log(`📋 npm run ${command.padEnd(25)} - ${description}`);
});

console.log('\n'); 