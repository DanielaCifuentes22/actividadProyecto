import { Router } from 'express';

// Se importa el pool de conexiones a MySQL.
import { pool } from '../db.js';

// Se crea una instancia del router.
const router = Router();

/**
 * Ruta: GET para obtener todos los clientes registrados
 */
router.get('/', async (req, res) => {
  try {
    // uso de SELECT para consulta de información.
    const [rows] = await pool.query(
      'SELECT id, nombre, documento, direccion, telefono, correo FROM clientes ORDER BY id DESC'
    );

    // Se responde al frontend con los datos en formato JSON.
    res.json(rows);
  } catch (error) {
    // Si ocurre un error, se muestra en consola para diagnóstico.
    console.error(error);

    // Se responde con código 500, que significa error interno del servidor.
    res.status(500).json({
      message: 'Error al obtener los clientes'
    });
  }
});

/**
 * Ruta: GET /api/clientes/:id
 * Función: obtener un cliente específico por su ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // El signo ? evita concatenar datos directamente en SQL.
    const [rows] = await pool.query(
      'SELECT * FROM clientes WHERE id = ?',
      [id]
    );

    // Si no se encuentra ningún cliente, se responde con 404.
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    // Si se encuentra, se responde con el primer resultado.
    res.json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al buscar el cliente'
    });
  }
});

/**
 * Ruta: POST para registro de nuevo cliente
 */
router.post('/', async (req, res) => {
  try {
    // req.body contiene los datos enviados desde el frontend.
    const { nombre, documento, direccion, telefono, correo } = req.body;

    // Validación básica, para evitar clientes sin datos obligatorios.
    if (!nombre || !documento || !telefono || !correo) {
      return res.status(400).json({
        message: 'Nombre, documento, telefono y correo son obligatorios'
      });
    }

    // Se ejecuta el INSERT.
    const [result] = await pool.query(
      `INSERT INTO clientes 
      (nombre, documento, direccion, telefono, correo) 
      VALUES (?, ?, ?, ?, ?)`,
      [nombre, documento, direccion, telefono, correo ]
    );

    // Se responde con código 201.
    // 201 significa recurso creado correctamente.
    res.status(201).json({
      message: 'Cliente registrado correctamente',
      id: result.insertId
    });
  } catch (error) {
    console.error(error);

    // Este error ocurre cuando se intenta registrar
    // un documento que ya existe.
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'Ya existe un cliente con ese documento'
      });
    }

    res.status(500).json({
      message: 'Error al registrar el cliente'
    });
  }
});

/**
 * Ruta: PUT /api/aprendices/:id
 * Función: actualizar un cliente existente.
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, documento, direccion, telefono, correo } = req.body;

    const [result] = await pool.query(
      `UPDATE clientes 
       SET nombre = ?, documento = ?, direccion = ?, telefono = ?, correo = ?
       WHERE id = ?`,
      [nombre, documento, direccion, telefono, correo]
    );

    // affectedRows indica cuántas filas fueron modificadas.
    // Si es 0, significa que no se encontró el cliente.
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    res.json({
      message: 'Cliente actualizado correctamente'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al actualizar el cliente'
    });
  }
});

/**
 * Ruta: DELETE /api/aprendices/:id
 * Función: eliminar un cliente por ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM clientes WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    res.json({
      message: 'Cliente eliminado correctamente'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al eliminar el cliente'
    });
  }
});

// Se exporta el router para poder usarlo en server.js.
export default router;