'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Matricula = require('../models/matricula');
var Estudiante = require('../models/estudiante');
var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');

var count = 0;
// Create a new moment object
var now = moment();

// Create a moment in the past, using a string date
var m = moment("April 1st, 2005", "MMM-DD-YYYY");

// Create a new moment using an array
var m = moment([2005, 3, 1]);


function saveMatricula(req, res) {

    var params = req.body;
    // buscar codigo estudiante
    Estudiante.findOne({ codigo: "6" }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Curso"
            });
        } else {
            if (users) {

                guardarPrimero(users, params);


            } else {

                return res.status(500).send({
                    message: "El Curso no Existe"
                });

            }
        }

    });

}

function guardarPrimero(estudiante, params) {
    Curso.findOne({ codigo: "3" }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Curso"
            });
        } else {
            if (users) {

                guardarSegundo(estudiante, users, params);


            } else {

                return res.status(500).send({
                    message: "El Curso no Existe"
                });

            }
        }

    });

}


function guardarSegundo(idE, idC, params) {

    var fecha = now.format('MM-DD-YYYY');
    console.log(idE._id, idC._id);

    matricula = new Matricula();
    //
    Matricula.findOne({
        '$and': [{ estudiante: idE._id }, { curso: idC._id }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al generar matricula"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El Estudiante ya fue matriculado"
                });
            } else {

                var array = Matricula.find((err, users) => {
                    if (err) {
                        res.status(500).send({
                            message: "Error al guardar Usuario"
                        });
                    } else {
                        if (users) {



                            users.forEach(element => {
                                console.log("numero de regsitros", count);
                                count++
                            });

                            //
                            matricula.codigo=count+1;
                            matricula.estudiante = idE._id;
                            matricula.curso = idC._id;
                            matricula.periodo = params.periodo;
                            matricula.fecha = fecha;



                            if (idC._id && idE._id) {

                                matricula.save((err, userStored) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: 'Errro al Generar matricula'
                                        });
                                    } else {
                                        if (!userStored) {
                                            res.status(404).send({
                                                message: 'No se ha generado la matricula'
                                            });
                                        } else {
                                            res.status(200).send({
                                                message: 'La matricula se ha generado correctamente'
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
    //
















}
module.exports = {          // para exportar todas las funciones de este modulo

    saveMatricula,

};