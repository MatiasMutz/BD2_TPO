const neo4j = require('neo4j-driver');
require('dotenv').config();

async function probarConexion() {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
    { encrypted: 'ENCRYPTION_OFF' }
  );
  
  try {
    const session = driver.session();
    console.log('✅ Conexión exitosa a Neo4j');
    
    const result = await session.run('CALL db.labels()');
    const labels = result.records.map(record => record.get(0));
    console.log('🏷️  Etiquetas disponibles:', labels);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await driver.close();
  }
}

probarConexion(); 