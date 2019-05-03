'use stric'


var express = require('express');
var NotaController = require('../controllers/nota');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerNota',md_auth.ensureAuth, NotaController.saveNotas);
api.post('/buscarNotas',md_auth.ensureAuth, NotaController.buscarNotas);

module.exports = api;