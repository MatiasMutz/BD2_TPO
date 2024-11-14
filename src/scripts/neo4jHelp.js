const commands = {
    "clean": "Resetea la base de datos con los datos de los CSV originales",
    "n1": "Obtener los datos de los clientes junto con sus teléfonos utilizando Neo4j",
    "n2": "Obtener los teléfonos y el número de cliente de Jacob Cooper utilizando Neo4j",
    "n3": "Obtener los teléfonos junto con los datos del cliente utilizando Neo4j",
    "n4": "Obtener los clientes que tengan registrada al menos una factura utilizando Neo4j",
    "n5": "Obtener los clientes que no tengan registrada ninguna factura utilizando Neo4j",
    "n6": "Obtener los clientes junto con la cantidad de facturas que tienen utilizando Neo4j",
    "n7": "Obtener las facturas de Kai Bullock utilizando Neo4j",
    "n8": "Obtener los productos que han sido facturados al menos una vez utilizando Neo4j",
    "n9": "Obtener las facturas que contengan productos de las marcas Ipsum utilizando Neo4j",
    "n10": "Obtener los nombres y apellido de los clientes junto con su gasto total con IVA utilizando Neo4j",
    "n11": "Obtener una vista que devuelva los datos de las facturas ordenadas por fecha utilizando Neo4j",
    "n12": "Obtener una vista que devuelva todos los productos que aún no han sido facturados utilizando Neo4j",
    "n13.1": "Crear un nuevo cliente utilizando Neo4j",
    "n13.2": "Eliminar un cliente existente utilizando Neo4j",
    "n13.3": "Modificar un cliente existente utilizando Neo4j",
    "n14.1": "Crear un nuevo producto utilizando Neo4j",
    "n14.2": "Modificar un producto existente utilizando Neo4j"
  };
  
  console.log('\n🚀 Comandos disponibles:\n');
  
  Object.entries(commands).forEach(([command, description]) => {
    console.log(`📋 npm run ${command.padEnd(25)} - ${description}`);
  });
  
  console.log('\n📌 Detalles de uso para n13.1:');
  console.log('   Para crear un nuevo cliente, use el siguiente formato:');
  console.log('   npm run n13.1 -- <nro_cliente> <nombre> <apellido> <direccion> <activo>');
  console.log('   Ejemplo: npm run n13.1 -- 12345 "Juan" "Pérez" "Calle Falsa 123" 1\n');
  
  console.log('\n📌 Detalles de uso para n13.2:');
  console.log('   Para eliminar un cliente, use el siguiente formato:');
  console.log('   npm run n13.2 -- <nro_cliente>');
  console.log('   Ejemplo: npm run n13.2 -- 12345\n');
  
  console.log('\n📌 Detalles de uso para n13.3:');
  console.log('   Para modificar un cliente, use el siguiente formato:');
  console.log('   npm run n13.3 -- <nro_cliente> <propiedad>=<valor>');
  console.log('   Ejemplo: npm run n13.3 -- 12345 "direccion"="Calle Nueva 456"\n');
  
  console.log('\n📌 Detalles de uso para n14.1:');
  console.log('   Para crear un nuevo producto, use el siguiente formato:');
  console.log('   npm run n14.1 -- <nro_producto> <nombre> <marca> <descripcion> <precio> <stock>');
  console.log('   Ejemplo: npm run n14.1 -- 12345 "Producto 1" "Marca 1" "Descripción 1" 100 10\n');
  
  console.log('\n📌 Detalles de uso para n14.2:');
  console.log('   Para modificar un producto, use el siguiente formato:');
  console.log('   npm run n14.2 -- <nro_producto> <propiedad>=<valor>');
  console.log('   Ejemplo: npm run n14.2 -- 12345 "precio"=100\n');
