'use strcit'

var bcrypt = require('bcrypt-nodejs');

var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');



function saveCurso(req, res) {
    var curso = new Curso();
    var params = req.body;
    var count = 0;
    Curso.findOne({
        '$and': [{ curso: params.curso }, { paralelo: params.paralelo }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Curso"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El Curso ya Existe"
                });
            } else {

                var array = Curso.find((err, users) => {
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
                            curso.codigo=count+1
                            curso.curso = params.curso;
                            curso.paralelo = params.paralelo;


                            if (params.curso && params.paralelo) {

                                curso.save((err, userStored) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: 'Errro al guardadr curso'
                                        });
                                    } else {
                                        if (!userStored) {
                                            res.status(404).send({
                                                message: 'No se ha registrado el curso'
                                            });
                                        } else {
                                            res.status(200).send({
                                                message: 'El Curso se ha registrado correctamente'
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


function getCursos(req, res) {




    var message = Curso.find().exec((err, listadoCursos) => {
        if (err) {
            return res.status(500).send({
                message: 'No se ha podido obtener las ultimas ofertas'
            });
        }

        if (!listadoCursos) {
            return res.status(200).send({
                message: 'No tiene ofertas'
            });
        }

        return res.status(200).send({
            listadoCursos
        });
    });

}

module.exports = {          // para exportar todas las funciones de este modulo

    saveCurso,
    getCursos




};