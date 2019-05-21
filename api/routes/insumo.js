'use stric'


var express = require('express');
var InsumoController = require('../controllers/insumo');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerInsumo',md_auth.ensureAuth, InsumoController.saveInsumos);

module.exports = api;