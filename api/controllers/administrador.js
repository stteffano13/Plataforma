'use strcit'

var bcrypt = require('bcrypt-nodejs');

var Administrador = require('../models/administrador');
var Periodo = require('../models/periodo');//importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');



function saveAdministrador(req, res) {
    var administrador = new Administrador();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
    // console.log(params);

    Administrador.findOne({
        '$and': [{ correo: params.correo }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Usuario"
            });
        } else {
            if (users) {
                return res.status(500).send({
                    message: "El Usuario ya Existe"
                });
            } else {

                administrador.correo = params.correo;
                administrador.contrasena = params.contrasena;


                if (params.contrasena) {

                    // encriptar contrasena y guardar datos
                    bcrypt.hash(params.contrasena, null, null, function (err, hash) {

                        administrador.contrasena = hash;
                        if (administrador.correo != null) {
                            //guardar usuario
                            administrador.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({
                                        message: 'Errro al guardadr usuario'
                                    });
                                } else {
                                    if (!userStored) {
                                        res.status(404).send({
                                            message: 'No se ha registrado el  usuario'
                                        });
                                    } else {
                                        res.status(200).send({
                                            message: 'El Usuario se ha registrado correctamente'
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

function loginAdministrador(req, res) {
    var params = req.body;

    var correo = params.email;
    var password = params.password;
    console.log("hola tefo este es el servicio provando el hash");
    //console.log(params.getHash);


    Administrador.findOne({ correo: correo }, (err, user) => {
        if (err) {
            //console.log("aqui hay un error en la peticion");
            res.status(500).send({
                message: 'Error al Autenticar Usuario revisa la conexion.'
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



function savePeriodoLectivoActual(req, res) {

    var params = req.body;
    var periodo = new Periodo();

    Periodo.findOne({
        '$and': [{ periodo: params.periodo }]
    }, (err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error al guardar Periodo"
            });
        } else {
            if (users) {
               
 
                Periodo.findByIdAndUpdate(users._id, params.periodo, (err, periodoUpdate) => {
  
                    if (err) {
                      res.status(500).send({ message: "Error al guardar nuevo periodo", err });
                
                    } else {
                      if (!periodoUpdate) {
                        res.status(404).send({ message: "El periodo no se ha actualizado" });
                      } else {
                        res.status(200).send({  message: "El periodo se ha actualizado correctamente"  });
                      }
                    }
                
                  });

            } else {

                periodo.periodo = params.periodo;


                periodo.save((err, periodosave) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'Error al asignar viaje'
                        });

                    }

                    if (!periodosave) {
                        return res.status(400).send({
                            message: 'No se asignado correctamente el viaje'
                        });
                    }
                    //console.log("message guardado" + messageStored);
                    return res.status(200).send({
                        periodo: periodosave
                    });
                });
            }
        }
    });
}

module.exports = {          // para exportar todas las funciones de este modulo

    saveAdministrador,
    loginAdministrador,
    savePeriodoLectivoActual




};