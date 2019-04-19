'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Materia = require('../models/materia');
var Docente = require('../models/docente');
var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');


// Create a new moment object
var now = moment();

// Create a moment in the past, using a string date
var m = moment("April 1st, 2005", "MMM-DD-YYYY");

// Create a new moment using an array
var m = moment([2005, 3, 1]);


function saveAsignacion(req, res) {

    var params = req.body;
    console.log("esto viene para amtricular", params);
    Docente.findOne({ codigo: params.codigoD }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al buscar Docente"
            });
        } else {
            if (users) {

                guardarPrimero(users, params, res);


            } else {

                return res.status(500).send({
                    message: "El Docente no Existe"
                });

            }
        }

    });

}

function guardarPrimero(docente, params, res) {
    Curso.findOne({ codigo: params.codigoC }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Curso"
            });
        } else {
            if (users) {

                guardarSegundo(docente, users, params, res);


            } else {

                return res.status(500).send({
                    message: "El Curso no Existe"
                });

            }
        }

    });

}



function guardarSegundo(idD, idC, params, res) {
    var count = 0;
    var fecha = now.format('MM-DD-YYYY');
    console.log(idD._id, idC._id);

    materia = new Materia();

    //
    Materia.findOne({
        '$and': [{ docente: idD._id }, { curso: idC._id }, { nombre: params.materia }, { periodo: params.periodo }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al generar matricula"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El docente ya fue asignado esta amteria"
                });
            } else {

                var array = Materia.find((err, users) => {
                    if (err) {
                        res.status(500).send({
                            message: "Error al asignar materias"
                        });
                    } else {
                        if (users) {



                            users.forEach(element => {
                                console.log("numero de regsitros", count);
                                count++
                            });

                            //
                            count++;
                            materia.codigo = "CODM"+count;
                            materia.docente = idD._id;
                            materia.curso = idC._id;
                            materia.periodo = params.periodo;
                            materia.estado = params.estado;


                            if (idD._id && idC._id) {

                                materia.save((err, userStored) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: 'Errro al Generar asignacion'
                                        });
                                    } else {
                                        if (!userStored) {
                                            res.status(404).send({
                                                message: 'No se ha generado la asignacion'
                                            });
                                        } else {
                                            res.status(200).send({
                                                message: 'La asignacion se ha generado correctamente'
                                            });

                                        }
                                    }

                                }); //  save es un metodo de mongoose


                            } else {
                                res.status(500).send({
                                    message: 'No han llegado todos los datos'
                                });
                            }
                            //
                        }
                    }
                });



            }
        }
    });

}

module.exports = {          // para exportar todas las funciones de este modulo

    saveAsignacion

};