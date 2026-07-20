// Se importa mysql2 en su versión con soporte para promesas.
import mysql from 'mysql2/promise';

// Se importa dotenv para poder leer las variables del archivo .env.
import dotenv from 'dotenv';

// Se ejecuta la configuración de dotenv.
dotenv.config();

// Se crea un pool de conexiones.
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  // Si todas las conexiones están ocupadas,
  // las nuevas solicitudes esperan su turno.
  waitForConnections: true,

  // Número máximo de conexiones simultáneas.
  connectionLimit: 10,

  // 0 significa que no hay límite de solicitudes en espera.
  queueLimit: 0
});