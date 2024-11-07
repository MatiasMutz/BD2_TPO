const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Conexión exitosa con MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;