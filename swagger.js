const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

// Opsi konfigurasi Swagger
const options = {
    definition: {
        openapi: '3.0.0', // Versi OpenAPI
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Dokumentasi API untuk aplikasi Node.js Anda',
        },
    },
    apis: ['./server.js'], // Ganti dengan file atau direktori API Anda
};

// Membuat OpenAPI Specification
const swaggerSpec = swaggerJSDoc(options);

// Menyimpan hasilnya ke file openapi.json
fs.writeFileSync('./openapi.json', JSON.stringify(swaggerSpec, null, 2), 'utf8');

console.log('OpenAPI Specification telah berhasil dibuat!');
