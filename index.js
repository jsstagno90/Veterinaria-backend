import express from "express";
import conectarDB from "./config/db.js";
import cors from 'cors'
import veterinarioRoutes from './routes/veterinariosRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json())

conectarDB()

const dominiosPermitidos = ['http://localhost:5173'];

const corsOptions = {
    origin: function(origin, callback){
        if(!origin) {
            return callback(null, true); 
        }

        if(dominiosPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}
app.use(cors(corsOptions));
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});


