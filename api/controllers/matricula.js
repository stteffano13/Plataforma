'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Matricula = require('../models/matricula');
var Materia = require('../models/materia');
var Estudiante = require('../models/estudiante');
var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var Periodo = require('../models/periodo'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

// Create a new moment object
var now = moment();

// Create a moment in the past, using a string date
var m = moment("April 1st, 2005", "MMM-DD-YYYY");

// Create a new moment using an array
var m = moment([2005, 3, 1]);


function saveMatricula(req, res) {

    var params = req.body;
    console.log("esto viene para amtricular", params);
    Estudiante.findOne({ codigo: params.codigoE }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al buscar Estudiante"
            });
        } else {
            if (users) {

                guardarPrimero(users, params, res);


            } else {

                return res.status(500).send({
                    message: "El estudiante no Existe"
                });

            }
        }

    });

}

function guardarPrimero(estudiante, params, res) {
    Curso.findOne({ codigo: params.codigoC }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al encontrar Curso"
            });
        } else {
            if (users) {

                guardarSegundo(estudiante, users, params, res);


            } else {

                return res.status(500).send({
                    message: "El Curso no Existe"
                });

            }
        }

    });

}


function guardarSegundo(idE, idC, params, res) {
    var count = 0;
    var fecha = now.format('MM-DD-YYYY');
    console.log(idE._id, idC._id);

    matricula = new Matricula();
    //
    Matricula.findOne({
        '$and': [{ estado: "0" }, { estudiante: idE._id }, { periodo: params.periodo }]
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
                            message: "Error al  buscar matricula de estudainte"
                        });
                    } else {
                        if (users) {



                            users.forEach(element => {
                                
                                count++
                            });
                            count++;
                            //
                            matricula.codigo = "CODMT" + count;
                            matricula.estudiante = idE._id;
                            matricula.curso = idC._id;
                            matricula.periodo = params.periodo;
                            matricula.fecha = fecha;
                            matricula.estado = params.estado;


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


function busquedaMatriculas(req, res) {
    var busqueda = req.params.busqueda;
    console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {


        var matriculas = Matricula.find({
            estado: '0'
        }).populate({
            path: 'estudiante'
        }).populate({
            path: 'curso'
        }).exec((err, matriculas) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener su matricula'
                });
            }

            if (!matriculas) {
                return res.status(200).send({
                    message: 'No tiene matriculas'
                });
            }

            return res.status(200).send({
                matriculas
            });
        });
    }
}




function updateMatricula(req, res) {
    var update = req.body;
    var messageId = req.params.id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body

    console.log("antes de eliminar matricula", messageId);

    var update = req.body;


    Matricula.findByIdAndUpdate(messageId, update, (err, matriculaUpdate) => {

        if (err) {
            res.status(500).send({ message: "Error al eliminar la matricula", err });

        } else {
            if (!matriculaUpdate) {
                res.status(404).send({ message: "La matricula no se ha actualizado" });
            } else {
                res.status(200).send({ message: "La matricula se ha actualizado correctamente" });
            }
        }

    });
}




function getEstudiantesMatriculas(req, res) {
    var busqueda = req.params.busqueda;
    console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {


        var periodo = Periodo.find().sort({ $natural: -1 }).limit(1).exec((err, periodo) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener periodo'
                });
            }

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene periodos'
                });
            } else {
                console.log(periodo);
                var matriculas = Matricula.find({
                    '$and': [{
                        estado: '0'
                    }, { curso: busqueda }, { periodo: periodo[0].periodo }]
                }).populate({
                    path: 'estudiante'
                }).populate({
                    path: 'curso'
                }).sort({ $natural: -1 }).exec((err, matriculas) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'No se han podido obtener sus Matriculas'
                        });
                    }

                    if (!matriculas) {
                        return res.status(200).send({
                            message: 'No tiene matriculas'
                        });
                    }

                    return res.status(200).send({
                        matriculas
                    });
                });

            }



        });

    }
}



function getlistadoMateriasE(req, res) {

    console.log("entre a materias estudiante",req.user.sub);
    var busqueda = req.user.sub;
    console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {


        //////////////////////

        var periodo = Periodo.find().sort({ $natural: -1 }).limit(1).exec((err, periodo) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener sus Viajes'
                });
            }

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene periodos'
                });
            } else {
                var matriculas = Matricula.find({
                    '$and': [{ estudiante: busqueda }, { estado: '0' }, { periodo: periodo[0].periodo }]
                }).populate({
                    path: 'estudiante'
                }).populate({
                    path: 'curso'
                }).exec((err, matriculas) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'No se han podido obtener su matricula'
                        });
                    }
        
                    if (!matriculas) {
                        return res.status(200).send({
                            message: 'No tiene viajes'
                        });
                    }
                    console.log("response curso", matriculas[0].curso._id);
                    getListadoMioMateriasE(req, res, matriculas[0].curso._id)
        
                });
              
            }
        });









      
    }
}


function getListadoMioMateriasE(req, res, busquedaE) {
    var busqueda = busquedaE;

    console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {

        var periodo = Periodo.find().sort({ $natural: -1 }).limit(1).exec((err, periodo) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener sus periodos'
                });
            }

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene viajes'
                });
            } else {

                console.log("todo ready entre a buscar", periodo[0].periodo);
                var materia = Materia.find({
                    '$and': [{ curso: busqueda }, { estado: '0' }, { periodo: periodo[0].periodo }]
                }).populate({
                    path: 'curso'
                }).exec((err, materias) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'No se han podido obtener sus Materias'
                        });
                    }

                    if (!materias) {
                        return res.status(200).send({
                            message: 'No tiene materias'
                        });
                    } else {

                        return res.status(200).send({

                            materias


                        });
                    }
                });
            }
        });



    }

}


module.exports = {          // para exportar todas las funciones de este modulo

    saveMatricula,
    busquedaMatriculas,
    updateMatricula,
    getEstudiantesMatriculas,
    getlistadoMateriasE


};