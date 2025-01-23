const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = path.join(__dirname, '../usuaris.json');

// Leer todos los usuarios
router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    const usuario = data.find(u => u.id === req.params.id);
    if (usuario) res.json(usuario);
    else res.status(404).json({ message: 'Usuari no trobat' });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    const nuevoUsuario = req.body;
    data.push(nuevoUsuario);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json(nuevoUsuario);
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    const usuarioIndex = data.findIndex(u => u.id === req.params.id);
    if (usuarioIndex !== -1) {
        data[usuarioIndex] = { id: req.params.id, ...req.body };
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.json(data[usuarioIndex]);
    } else res.status(404).json({ message: 'Usuari no trobat' });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    const usuarioIndex = data.findIndex(u => u.id === req.params.id);
    if (usuarioIndex !== -1) {
        data.splice(usuarioIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(204).send();
    } else res.status(404).json({ message: 'Usuari no trobat' });
});

module.exports = router;
