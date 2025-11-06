import express from "express";
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinariosRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json())

conectarDB()

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});


