

var Insumo = require('../models/insumo');
var NotaB  = require('../models/notaB');


function saveInsumos(req, res) {
  var params = req.body;  
   var insumo = new Insumo();
    
   insumo.insumo1= params.insumo1,
   insumo.insumo2= params.insumo2,
   insumo.insumo3 = params.insumo3,
   insumo.insumo4=  params.insumo4,
   params.insumo5= insumo.insumo5,
   insumo.insumo6= params.insumo6,
   insumo.insumo7= params.insumo7,
   insumo.insumo8= params.insumo8,
   insumo.insumo11= params.insumo11,
   insumo.insumo22= params.insumo22,
   insumo.insumo33=params.insumo33,
   insumo.insumo44= params.insumo44,
   insumo.insumo55= params.insumo55,
   insumo.insumo66= params.insumo66,
   insumo.insumo77= params.insumo77,
   insumo.insumo88= params.insumo88,
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