'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Materia = require('../models/materia');
var Docente = require('../models/docente');
var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var Periodo = require('../models/periodo'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');


// Create a new moment object
var now = moment();

// Create a moment in the past, using a string date
var m = moment("April 1st, 2005", "MMM-DD-YYYY");

// Create a new moment using an array
var m = moment([2005, 3, 1]);


function saveAsignacion(req, res) {

    var params = req.body;

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
        '$and': [{estado: 0},{ docente: idD._id }, { curso: idC._id }, { nombre: params.nombre }, { periodo: params.periodo }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al generar matricula"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El docente ya fue asignado esta materia"
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
                            materia.nombre = params.nombre;
                            materia.codigo = "CODM" + count;
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



function busquedaMateria(req, res) {
    var busqueda = req.params.busqueda;
    console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {


        var matriculas = Materia.find({
            estado: '0'
        }).populate({
            path: 'docente'
        }).populate({
            path: 'curso'
        }).exec((err, materias) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener Materias'
                });
            }

            if (!materias) {
                return res.status(200).send({
                    message: 'No tiene materias'
                });
            }

            return res.status(200).send({
                materias
            });
        });
    }
}


function getListadoMioMaterias(req, res) {
    var busqueda = req.user.sub;

    console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {

        var periodo = Periodo.find().sort({ $natural: -1 }).limit(1).exec((err, periodo) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener Materias'
                });
            }
    
            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene Materias'
                });
            }else{

                var materia = Materia.find({
                    '$and': [{ docente: busqueda }, { estado: '0' },{periodo: periodo[0].periodo}]
                }).populate({
                    path: 'curso'
                }).exec((err, materias) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'No se han podido obtener Materias'
                        });
                    }
        
                    if (!materias) {
                        return res.status(200).send({
                            message: 'No tiene Materias'
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



    

function updateMateria(req, res) {
    var update = req.body;
    var messageId = req.params.id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body


    var update = req.body;


    Materia.findByIdAndUpdate(messageId, update, (err, materiaUpdate) => {

        if (err) {
            res.status(500).send({ message: "Error al eliminar la materia", err });

        } else {
            if (!materiaUpdate) {
                res.status(404).send({ message: "La materia no se ha actualizado" });
            } else {
                res.status(200).send({ message: "La materia se ha actualizado correctamente" });
            }
        }

    });
}




function getListadoMateriasCurso(req, res)
{
    var busqueda = req.params.curso;

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
            }else{

                console.log("todo ready entre a buscar",periodo[0].periodo);
                var materia = Materia.find({
                    '$and': [{ curso: busqueda }, { estado: '0' },{periodo: periodo[0].periodo}]
                }).populate({
                    path: 'curso'
                }).exec((err, materias) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'No se han podido obtener Materias'
                        });
                    }
        
                    if (!materias) {
                        return res.status(200).send({
                            message: 'No tiene Materias'
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

    saveAsignacion,
    busquedaMateria,
    updateMateria,
    getListadoMioMaterias,
    getListadoMateriasCurso

};