// Se importa Express para crear el servidor.
import express from 'express';

// Se importa CORS para permitir solicitudes desde otro puerto.
// El frontend corre en localhost:5173.
// El backend corre en localhost:3000.
import cors from 'cors';

// Se importa dotenv para leer variables de entorno.
import dotenv from 'dotenv';

// Se importan las rutas de clientes.
import clientesRoutes from './routes/clientes.routes.js';

// Se activa dotenv.
dotenv.config();

// Se crea una aplicación de Express.
const app = express();

// Se habilita CORS.
// Esto permite que React pueda comunicarse con la API.
app.use(cors());

// Se habilita la lectura de JSON.
app.use(express.json());

// Ruta básica de prueba para verificar que la API está funcionando.
app.get('/', (req, res) => {
  res.json({
    message: 'API de clientes funcionando correctamente'
  });
});

// Se conectan las rutas de clientes.
app.use('/api/clientes', clientesRoutes);

// Se define el puerto.
// Primero intenta usar el puerto del archivo .env.
// Si no existe, usa 3000.
const PORT = process.env.PORT || 3000;

// Se inicia el servidor.
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});