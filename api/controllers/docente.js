'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');


var Docente = require('../models/docente'); //importar el modelo del usuario  o lo que son las clases comunes
var Materia = require('../models/materia'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');



// Create a new moment object


// Create a moment in the past, using a string date


// Create a new moment using an array


function saveDocente(req, res) {
    var count = 0;
    var docente = new Docente();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
    // console.log(params);

    Docente.findOne({
        '$and': [{estado:"0"},{'$or': [{ correo: params.correo },{cedula: params.cedula}]}]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al verificar datos"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El Docente ya Existe, revise  cédula y correo electronico"
                });
            } else {

                var array = Docente.find((err, users) => {
                    if (err) {
                        res.status(500).send({
                            message: "Error al guardar Docente"
                        });
                    } else {
                        if (users) {



                            users.forEach(element => {
                                console.log("numero de regsitros", count);
                                count++
                            });
                            count++;
                            docente.codigo = "CODD" + count;
                            docente.nombre = params.nombre;
                            docente.apellido = params.apellido;
                            docente.correo = params.correo;
                            docente.contrasena = params.contrasena;
                            docente.tel_celular = params.tel_celular;
                            docente.cedula = params.cedula;
                            docente.estado=params.estado;

                            if (params.contrasena) {

                                // encriptar contrasena y guardar datos
                                bcrypt.hash(params.contrasena, null, null, function (err, hash) {

                                    docente.contrasena = hash;
                                    if (docente.nombre != null && docente.apellido != null && docente.correo != null) {
                                        //guardar usuario
                                        docente.save((err, userStored) => {
                                            if (err) {
                                                res.status(500).send({
                                                    message: 'Errro al guardadr docente'
                                                });
                                            } else {
                                                if (!userStored) {
                                                    res.status(404).send({
                                                        message: 'No se ha registrado el  docente'
                                                    });
                                                } else {
                                                    res.status(200).send({
                                                        message: 'El docente se ha registrado correctamente'
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


function loginDocente(req, res) {
    var params = req.body;

    var correo = params.email;
    var password = params.password;
    console.log("hola tefo este es el servicio provando el hash");
    //console.log(params.getHash);


    Docente.findOne({ correo: correo }, (err, user) => {
        if (err) {
            //console.log("aqui hay un error en la peticion");
            res.status(500).send({
                message: 'Error al Autenticar Usuario.'
            });
        } else {
            if (!user) {
                // console.log("error 404 el usuario no existe");
                res.status(404).send({
                    message: 'El Usuario no existe.'
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
                            message: 'Autencicación fallida usuario o contraseña incorrectos.'
                        });

                    }
                });


            }
        }

    }); //como el where en sql
    console.log('no encontro');
}


function updateDocente(req, res) {
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

            Docente.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                if (err) {
                    res.status(500).send({
                        message: "Error al actualizar Usuario"
                    });

                } else {
                    if (!userUpdate) {
                        res.status(404).send({
                            message: "El usuario no ha podido actualizarse."
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

if(update.estado==1)
{

    Materia.findOne({
        '$and': [{estado: 0}, { docente:update._id }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al buscar concidencias"
            });

        } else {
            if (users) {
                res.status(400).send({
                    message: "No eliminar, hay materias asignadas al docente"
                });

            } else {
                Docente.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                    if (err) {
                        res.status(500).send({
                            message: "Error al actualizar Docente."
                        });

                    } else {
                        if (!userUpdate) {
                            res.status(404).send({
                                message: "El docente no ha podido actualizarse."
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

}else{



        Docente.findOne({
            '$and': [{estado: 0}, { correo: update.correo }]
        }, (err, users) => {
            if (err) {
                res.status(500).send({
                    message: "Error al Actualizar Docente"
                });

            } else {
                if (users) {
                    if (users._id != update._id) {
                        res.status(500).send({
                            message: "El correo que desea ingresar pertenece a otro Usuario"
                        });
                    } else {
                        Docente.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                            if (err) {
                                res.status(500).send({
                                    message: "Error al actualizar docente."
                                });

                            } else {
                                if (!userUpdate) {
                                    res.status(404).send({
                                        message: "El docente no ha podido actualizarse."
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
                    Docente.findByIdAndUpdate(userId, update, (err, userUpdate) => {

                        if (err) {
                            res.status(500).send({
                                message: "Error al actualizar Usuario."
                            });

                        } else {
                            if (!userUpdate) {
                                res.status(404).send({
                                    message: "El docente no ha podido actualizarse."
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

}





function busquedaDocentes(req, res) {
    var busqueda = req.params.busqueda;
    //console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {
        var findDocente = Docente.find({
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
            (err, docentes) => {
                if (err) {
                    res.status(500).send({
                        message: "Error al obtener Docentes"
                    });

                } else {
                    if (!docentes) {
                        res.status(404).send({
                            message: "No se encuentra resultados de la busqueda"
                        });
                    } else {
                        res.status(200).send({
                            docentes
                        });
                    }
                }
            });
    }
}




function getDocentes(req, res) {




    var message = Docente.find().exec((err, listadoDocentes) => {
        if (err) {
            return res.status(500).send({
                message: 'No se ha podido obtener las ultimas ofertas'
            });
        }

        if (!listadoDocentes) {
            return res.status(200).send({
                message: 'No tiene ofertas'
            });
        }

        return res.status(200).send({
            listadoDocentes
        });
    });

}

module.exports = {          // para exportar todas las funciones de este modulo

    saveDocente,
    loginDocente,
    busquedaDocentes,
    updateDocente,
    getDocentes



};