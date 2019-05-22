

var Insumo = require('../models/insumo');
var NotaB = require('../models/notaB');


function saveInsumos(req, res) {
    var params = req.body;



    Insumo.findOne({ '$and': [{ periodo: params.periodo }, { materia: params.materia }] }, (err, insumos) => {
        if (err) {

            res.status(500).send({
                message: "Error al buscar Insumos en la base"
            });

        } else {
            if (insumos) {

                updateInsumos(insumos, params, res);


            } else {

                saveInsumos2(params, res);


            }
        }

    });




}


function saveInsumos2(params, res) {
    var insumo = new Insumo();

    insumo.Descinsumo1 = params.Descinsumo1,
        insumo.Descinsumo2 = params.Descinsumo2,
        insumo.Descinsumo3 = params.Descinsumo3,
        insumo.Descinsumo4 = params.Descinsumo4,
        params.Descinsumo5 = insumo.Descinsumo5,
        insumo.Descinsumo6 = params.Descinsumo6,
        insumo.Descinsumo7 = params.Descinsumo7,
        insumo.Descinsumo8 = params.Descinsumo8,
        insumo.Descinsumo11 = params.Descinsumo11,
        insumo.Descinsumo22 = params.Descinsumo22,
        insumo.Descinsumo33 = params.Descinsumo33,
        insumo.Descinsumo44 = params.Descinsumo44,
        insumo.Descinsumo55 = params.Descinsumo55,
        insumo.Descinsumo66 = params.Descinsumo66,
        insumo.Descinsumo77 = params.Descinsumo77,
        insumo.Descinsumo88 = params.Descinsumo88,
        insumo.periodo = params.periodo,
        insumo.materia = params.materia,

        insumo.save((err, insumoStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar descripcion del insumo'
                });
            } else {
                if (!insumoStored) {
                    res.status(404).send({
                        message: 'No se ha registrado el insumo'
                    });
                } else {
                    res.status(200).send({
                        message: 'El Insumo se ha registrado correctamente'
                    });

                }
            }

        });
}


function updateInsumos(insumos, params, res) {
    console.log("estos son losinsumos que viene", params);
    params._id = insumos._id;

    Insumo.findByIdAndUpdate(insumos._id, params, (err, insumoUpdate) => {

        if (err) {
            res.status(500).send({
                message: err
            });

        } else {
            if (!insumoUpdate) {
                res.status(404).send({
                    message: "El insumo no ha podido actualizarse."
                });
            } else {

                res.status(200).send({
                    message: "El insumo se actualizo correctamente."
                });

            }
        }

    });
}



function getDiscInsumo(req, res) {
    var busqueda = req.body;
    console.log("busqueda insumos",busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {


        var insumos = Insumo.findOne({'$and': [{ materia: busqueda.materia }, {periodo: busqueda.periodo}] }).exec((err, insumos) => {
            if (err) {
                return res.status(500).send({
                    message: 'No se han podido obtener la descripcion de insumos'
                });
            }

            if (!insumos) {
                return res.status(200).send({
                    message: 'No existe descripcion algna de insumos'
                });
            }

            return res.status(200).send({
                insumos
            });
        });
    }
}


module.exports = {          // para exportar todas las funciones de este modulo

    saveInsumos,
    saveInsumos2,
    getDiscInsumo


};