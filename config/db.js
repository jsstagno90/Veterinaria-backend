import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB conectado en host: ${db.connection.host}`);
    console.log(`📦 Base de datos: ${db.connection.name}`);
  } catch (error) {
    console.error(`❌ Error al conectar: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
