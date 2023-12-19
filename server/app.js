import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise'

import unitRoutes from './routes/unitRoutes.js'
import unitsDataRoutes from './routes/unitsDataRoutes.js'
import cors from 'cors';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'dblbox',
}

const connection = await mysql.createConnection(config)

const app = express()
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable('x-powered-by')
app.use(express.json());

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log('server listening on port http://localhost:' + PORT)
})

// Middleware para redirigir de "/" a "/home"
app.use((req, res, next) => {
    if (req.url === '/') {
        res.redirect(301, '/home');
    } else {
        next();
    }
});

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Manejar la solicitud GET para la página principal ("/home")
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/pages/index.html');
});

// Manejar la solicitud GET para la sección "Characters"
app.get('/characters', (req, res) => {
    res.sendFile(__dirname + '/public/pages/characters.html');
});

// Manejar la solicitud GET para la sección "Equipments"
app.get('/equipments', (req, res) => {
    res.sendFile(__dirname + '/public/pages/equipments.html');
});

app.get('/formulario/tags', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/forms/post_tag.html'));
});

app.get('/formulario/units', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/forms/post_unit.html'));
});

app.use('/', unitsDataRoutes)
app.use('/', unitRoutes)