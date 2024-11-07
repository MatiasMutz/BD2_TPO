const { MongoClient } = require('mongodb');
require('dotenv').config();

async function probarConexion() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Conexión exitosa a MongoDB');
    
    const db = client.db(process.env.DB_NAME);
    const collections = await db.listCollections().toArray();
    console.log('📚 Colecciones disponibles:', collections.map(col => col.name));
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

probarConexion(); 