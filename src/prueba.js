const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://3.237.97.109:7687',
    neo4j.auth.basic('neo4j', 'sets-centimeters-particle'), 
    {/* encrypted: 'ENCRYPTION_OFF' */});

const main = async () => {
  const session = driver.session();
  try {
    const result = await session.run('RETURN "Hola desde Neo4j Sandbox" AS mensaje');
    console.log(result.records[0].get('mensaje'));
  } finally {
    await session.close();
    await driver.close();
  }
};

main().catch(console.error);