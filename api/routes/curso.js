'use stric'


var express = require('express');
var CursoController = require('../controllers/curso');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerCurso', md_auth.ensureAuth, CursoController.saveCurso);
api.get('/getListadoCursos',md_auth.ensureAuth, CursoController.getCursos);
api.post('/update-curso', md_auth.ensureAuth, CursoController.updateCurso);

api.get('/getAllListadoCursos',md_auth.ensureAuth, CursoController.getCursos);
module.exports = api;