const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas principales
app.use('/usuaris', require('./routes/usuaris'));
app.use('/recursos', require('./routes/recursos'));
app.use('/reserves', require('./routes/reserves'));
app.use('/notificacions', require('./routes/notificacions'));

// Servidor principal
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
