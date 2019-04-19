'use stric'


var express = require('express');
var MateriaController = require('../controllers/materia');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerMateria', MateriaController.saveAsignacion);
//api.get('/getListadoCursos',md_auth.ensureAuth, CursoController.getCursos);

module.exports = api;