'use stric'


var express = require('express');
var DocenteController = require('../controllers/docente');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerDocente', md_auth.ensureAuth,DocenteController.saveDocente);
api.post('/loginDocente', DocenteController.loginDocente);
api.put('/update-docente/:id', md_auth.ensureAuth, DocenteController.updateDocente);
//pruebas


module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end