'use stric'


var express = require('express');
var MatriculaController = require('../controllers/matricula');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerMatricula',md_auth.ensureAuth, MatriculaController.saveMatricula);
api.get('/buscarMatriculas/:busqueda', md_auth.ensureAuth, MatriculaController.busquedaMatriculas);
//api.get('/getListadoCursos',md_auth.ensureAuth, CursoController.getCursos);

module.exports = api;