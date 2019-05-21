

var Insumo = require('../models/insumo');
var NotaB  = require('../models/notaB');


function saveInsumos(req, res) {
  var params = req.body;  

  console.log("estos son tus parametros de insumos", params);
   var insumo = new Insumo();
    
   insumo.insumo1= params.Descinsumo1,
   insumo.insumo2= params.Descinsumo2,
   insumo.insumo3 = params.Descinsumo3,
   insumo.insumo4=  params.Descinsumo4,
   params.insumo5= insumo.Descinsumo5,
   insumo.insumo6= params.Descinsumo6,
   insumo.insumo7= params.Descinsumo7,
   insumo.insumo8= params.Descinsumo8,
   insumo.insumo11= params.Descinsumo11,
   insumo.insumo22= params.Descinsumo22,
   insumo.insumo33=params.Descinsumo33,
   insumo.insumo44= params.Descinsumo44,
   insumo.insumo55= params.Descinsumo55,
   insumo.insumo66= params.Descinsumo66,
   insumo.insumo77= params.Descinsumo77,
   insumo.insumo88= params.Descinsumo88,
   insumo.periodo= params.periodo,
   insumo.materia= params.materia,

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
    module.exports = {          // para exportar todas las funciones de este modulo

        saveInsumos
      
      
      };