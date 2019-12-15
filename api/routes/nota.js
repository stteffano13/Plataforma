'use stric'


var express = require('express');
var NotaController = require('../controllers/nota');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerNota',md_auth.ensureAuth, NotaController.saveNotas);
api.post('/registerNotaB',md_auth.ensureAuth, NotaController.saveNotasB);
api.post('/buscarNotas',md_auth.ensureAuth, NotaController.buscarNotas);
api.post('/buscarNotasB',md_auth.ensureAuth, NotaController.buscarNotasB);
api.post('/buscarNotasEstudiante',md_auth.ensureAuth, NotaController.buscarNotasEstudiante);
api.post('/buscarNotasEstudianteB',md_auth.ensureAuth, NotaController.buscarNotasEstudianteB);
api.post('/buscarNotasMatris',md_auth.ensureAuth, NotaController.buscarNotasMatris);
api.post('/buscarNotasMatrisB',md_auth.ensureAuth, NotaController.buscarNotasMatrisB);

api.post('/subirNotas',md_auth.ensureAuth,NotaController.subirNotas);
module.exports = api;