import express from "express"
import mysql from 'mysql2/promise'

const router = express.Router()

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'dblbox',
}

router.get('/tags', async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los datos de la tabla tag
        const connection = await mysql.createConnection(config)
        const [results] = await connection.query('SELECT * FROM tag');
        connection.end();

        res.json(results); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los tags:', error);
        res.status(500).json({ error: 'Error al obtener todos los tags de la base de datos' });
    }
    return
});

router.get('/types', async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los datos de la tabla tag
        const connection = await mysql.createConnection(config)
        const [results] = await connection.query('SELECT * FROM type');
        connection.end();

        res.json(results); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los tags:', error);
        res.status(500).json({ error: 'Error al obtener todos los tags de la base de datos' });
    }
    return
});

router.get('/chapters', async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los datos de la tabla tag
        const connection = await mysql.createConnection(config)
        const [results] = await connection.query('SELECT * FROM chapter');
        connection.end();

        res.json(results); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los tags:', error);
        res.status(500).json({ error: 'Error al obtener todos los tags de la base de datos' });
    }
    return
});

router.get('/colors', async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los datos de la tabla tag
        const connection = await mysql.createConnection(config)
        const [results] = await connection.query('SELECT * FROM color');
        connection.end();

        res.json(results); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los tags:', error);
        res.status(500).json({ error: 'Error al obtener todos los tags de la base de datos' });
    }
    return
});

router.get('/rarity', async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los datos de la tabla tag
        const connection = await mysql.createConnection(config)
        const [results] = await connection.query('SELECT * FROM rarity');
        connection.end();

        res.send(results); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los tags:', error);
        res.status(500).json({ error: 'Error al obtener todos los tags de la base de datos' });
    }
    return
});

router.get('/extra_options', async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los datos de la tabla tag
        const connection = await mysql.createConnection(config)
        const [results] = await connection.query('SELECT * FROM extra_option');
        connection.end();

        res.json(results); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los tags:', error);
        res.status(500).json({ error: 'Error al obtener todos los tags de la base de datos' });
    }
    return
});

// Ruta para procesar la inserción desde el formulario
router.post('/tags', async (req, res) => {
    try {
        const { tagNombre } = req.body;

        const connection = await mysql.createConnection(config);

        // Realiza la inserción en la base de datos
        const [result] = await connection.query('INSERT INTO tag (tag_name) VALUES (?)', [tagNombre]);

        connection.end();

        res.json({ message: 'Tag agregado con éxito', tagId: result.insertId });
    } catch (error) {
        console.error('Error al agregar el tag:', error);
        res.status(500).json({ error: 'Error al agregar el tag a la base de datos' });
    }
    return
});

export default router;