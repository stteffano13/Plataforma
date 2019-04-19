'use stric'


var express = require('express');
var EstudianteController = require('../controllers/estudiante');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerEstudiante',EstudianteController.saveEstudiante);
api.post('/loginEstudiante', EstudianteController.loginEstudiante);
api.get('/buscarEstudiantes/:busqueda', md_auth.ensureAuth, EstudianteController.busquedaEstudiantes);
api.put('/update-estudiante/:id', md_auth.ensureAuth, EstudianteController.updateEstudiante);
api.get('/getListadoEstudiantes',md_auth.ensureAuth, EstudianteController.getEstudiantes);
//pruebas


module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end