'use stric'


var express = require('express');
var MatriculaController = require('../controllers/matricula');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerMatricula', MatriculaController.saveMatricula);
//api.get('/getListadoCursos',md_auth.ensureAuth, CursoController.getCursos);

module.exports = api;