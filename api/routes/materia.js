'use stric'


var express = require('express');
var MateriaController = require('../controllers/materia');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerMateria', MateriaController.saveAsignacion);
api.get('/buscarMaterias/:busqueda', md_auth.ensureAuth, MateriaController.busquedaMateria);
api.get('/getListadoMioMaterias', md_auth.ensureAuth, MateriaController.getListadoMioMaterias);
api.put('/update-materia/:id', md_auth.ensureAuth, MateriaController.updateMateria);
api.get('/getListadoMateriasCurso/:curso', MateriaController.getListadoMateriasCurso);

//api.get('/getListadoCursos',md_auth.ensureAuth, CursoController.getCursos);

module.exports = api;