const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sql = require('mssql');
const port = 3000;

const dbConfig = {
    user: 'mamankAdmin',
    password: 'Mamank123',
    server: 'umkmku.database.windows.net', // Alamat server Azure
    database: 'umkmku',
    options: {
        encrypt: true, // Azure membutuhkan koneksi terenkripsi
        trustServerCertificate: false, // Tetap false kecuali jika Anda menggunakan sertifikat server terpercaya
    },
    port: 1433, // Port default untuk Azure SQL Server
};

// Inisialisasi Aplikasi Express
const app = express();
app.use(bodyParser.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Node.js API',
            version: '1.0.0',
            description: 'API documentation for my Node.js app',
        },
        servers: [
            {
                url: 'https://<your-azure-api-app>.azurewebsites.net',
                description: 'Azure API Server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Sesuaikan path file route Anda
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Endpoint untuk Fetch Data
app.get('/api/data', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM barangs');
        res.json(result.recordset); // Mengembalikan hasil query sebagai JSON
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`server berjalan di http://localhost:${port}`);
});