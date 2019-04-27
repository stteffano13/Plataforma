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
                            count=count+1;
                            //
                            curso.codigo="CODC"+count;
                            curso.curso = params.curso;
                            curso.paralelo = '"'+params.paralelo+'"';
                            curso.estado="0";

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




    var message = Curso.find({estado:"0"}).exec((err, listadoCursos) => {
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



function updateCurso(req, res) {
  
    var messageId = req.body.id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
  
  console.log("antes de eliminar matricula", req.body.id);

  var message = Curso.find({codigo: messageId}).exec((err, curso) => {
    if (err) {
        return res.status(500).send({
            message: 'No se ha podido obtener las ultimas ofertas'
        });
    }

    if (!curso) {
        return res.status(200).send({
            message: 'No tiene ofertas'
        });
    }else{


        curso[0].estado="1";

        console.log(curso[0]._id);

        Curso.findByIdAndUpdate(curso[0]._id, curso[0], (err, cursoUpdate) => {
  
            if (err) {
              res.status(500).send({ message: "Error al eliminar el curso", err });
        
            } else {
              if (!cursoUpdate) {
                res.status(404).send({ message: "El  curso no  se ha actualizado" });
              } else {
                res.status(200).send({  message: "El curso se ha actualizado correctamente"  });
              }
            }
        
          });

        }
});

  
   
  }
  
module.exports = {          // para exportar todas las funciones de este modulo

    saveCurso,
    getCursos,
    updateCurso




};