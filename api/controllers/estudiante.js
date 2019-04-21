'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');


var Estudiante = require('../models/estudiante'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');



// Create a new moment object


// Create a moment in the past, using a string date


// Create a new moment using an array


function saveEstudiante(req, res) {
    var estudiante = new Estudiante();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
    var count = 0;
    // console.log(params);





    Estudiante.findOne({
        '$and': [{ correo: params.correo }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Usuario"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El Estudiante ya Existe"
                });
            } else {

                var array = Estudiante.find((err, users) => {
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
                            estudiante.codigo = "CODE"+count;
                            estudiante.nombre = params.nombre;
                            estudiante.apellido = params.apellido;
                            estudiante.correo = params.correo;
                            estudiante.contrasena = params.contrasena;
                            estudiante.tel_celular = params.tel_celular;
                            estudiante.cedula = params.cedula;
                            estudiante.estado=params.estado;

                            if (params.contrasena) {

                                // encriptar contrasena y guardar datos
                                bcrypt.hash(params.contrasena, null, null, function (err, hash) {

                                    estudiante.contrasena = hash;
                                    if (estudiante.nombre != null && estudiante.apellido != null && estudiante.correo != null && estudiante.cedula != null) {
                                        //guardar usuario
                                        estudiante.save((err, userStored) => {
                                            if (err) {
                                                res.status(500).send({
                                                    message: 'Errro al guardadr estudiante'
                                                });
                                            } else {
                                                if (!userStored) {
                                                    res.status(404).send({
                                                        message: 'No se ha registrado el  estudiante'
                                                    });
                                                } else {
                                                    res.status(200).send({
                                                        message: 'El estudiante se ha registrado correctamente'
                                                    });

                                                }
                                            }

                                        }); //  save es un metodo de mongoose
                                    } else {
                                        res.status(200).send({
                                            message: 'Introduce la contraseña '
                                        });
                                    }
                                });

                            } else {
                                res.status(500).send({
                                    message: 'Introduce la contraseña'
                                });
                            }
                        }
                    }
                });

            }
        }
    });
}

function loginEstudiante(req, res) {
    var params = req.body;

    var correo = params.email;
    var password = params.password;
    console.log("hola tefo este es el servicio provando el hash");
    //console.log(params.getHash);


    Estudiante.findOne({ correo: correo }, (err, user) => {
        if (err) {
            //console.log("aqui hay un error en la peticion");
            res.status(500).send({
                message: 'Error al Autenticar Usuario.'
            });
        } else {
            if (!user) {
                // console.log("error 404 el usuario no existe");
                res.status(404).send({
                    message: 'El estudiante no existe.'
                });
            } else {
                //console.log(user);
                bcrypt.compare(password, user.contrasena, function (err, check) {



                    if (check) {
                        //console.log("vamos a ver que pasa con el hash");
                        //console.log(params.getHash);
                        if (params.getHash) {


                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user
                            });
                        }

                    } else {
                        res.status(404).send({
                            message: 'El estudiante no ha podido Autenticarse.'
                        });

                    }
                });


            }
        }

    }); //como el where en sql
    console.log('no encontro');
}


function busquedaEstudiantes(req, res) {
    var busqueda = req.params.busqueda;
    //console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {
        var findDocente = Estudiante.find({
            '$and': [{
                estado: '0'
            },

            {
                '$or': [{
                    nombre: new RegExp('^' + busqueda, "i")
                },
                {
                    apellido: new RegExp('^' + busqueda, "i")
                }, {
                    correo: new RegExp('^' + busqueda, "i")
                },
                {
                    cedula: new RegExp('^' + busqueda, "i")
                }, {
                    codigo: new RegExp('^' + busqueda, "i")
                }
                ]
            }
            ]
        },
            (err, estudiantes) => {
                if (err) {
                    res.status(500).send({
                        message: "Error al obtener Docentes"
                    });

                } else {
                    if (!estudiantes) {
                        res.status(404).send({
                            message: "No se encuentra resultados de la busqueda"
                        });
                    } else {
                        res.status(200).send({
                            estudiantes
                        });
                    }
                }
            });
    }
}


function updateEstudiante(req, res) {
    var userId = req.params.id; // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
    var update = req.body;




    if (update.estadoContrasena == '1') {
        //  console.log("entre para encriptar", update.estadoContrasena);
        // encriptar contrasena y guardar datos
        hash = true;
        bcrypt.hash(update.contrasena, null, null, function (err, hash) {
            update.contrasena = hash;
            //   console.log("contrasena nueva encriptada", update.contrasena);
            update.estadoContrasena == '';

            Estudiante.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                if (err) {
                    res.status(500).send({
                        message: "Error al actualizar estudiante"
                    });

                } else {
                    if (!userUpdate) {
                        res.status(404).send({
                            message: "El estudiante no ha podido actualizarse."
                        });
                    } else {
                        res.status(200).send({
                            user: userUpdate
                        });
                    }
                }

            });

        });
    } else {
        update.estadoContrasena == '';


        Estudiante.findOne({
            '$and': [{}, { correo: update.correo }]
        }, (err, users) => {
            if (err) {
                res.status(500).send({
                    message: "Error al Actualizar estudiante"
                });

            } else {
                if (users) {
                    if (users._id != update._id) {
                        res.status(500).send({
                            message: "El correo que desea ingresar pertenece a otro estudiante"
                        });
                    } else {
                        Estudiante.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                            if (err) {
                                res.status(500).send({
                                    message: "Error al actualizar estudiante."
                                });

                            } else {
                                if (!userUpdate) {
                                    res.status(404).send({
                                        message: "El estudiante no ha podido actualizarse."
                                    });
                                } else {
                                    res.status(200).send({
                                        user: userUpdate
                                    });
                                }
                            }

                        });
                    }

                } else {
                    Estudiante.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                        if (err) {
                            res.status(500).send({
                                message: "Error al actualizar estudiante."
                            });

                        } else {
                            if (!userUpdate) {
                                res.status(404).send({
                                    message: "El estudiante no ha podido actualizarse."
                                });
                            } else {
                                res.status(200).send({
                                    user: userUpdate
                                });
                            }
                        }

                    });
                }
            }

        });







    }


}


function getEstudiantes(req, res) {




    var message = Estudiante.find().exec((err, listadoEstudiantes) => {
        if (err) {
            return res.status(500).send({
                message: 'No se ha podido obtener las ultimas ofertas'
            });
        }

        if (!listadoEstudiantes) {
            return res.status(200).send({
                message: 'No tiene ofertas'
            });
        }

        return res.status(200).send({
            listadoEstudiantes
        });
    });

}


module.exports = {          // para exportar todas las funciones de este modulo

    saveEstudiante,
    loginEstudiante,
    busquedaEstudiantes,
    updateEstudiante,
    getEstudiantes




};