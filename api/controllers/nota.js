
var Nota = require('../models/nota');

function saveNotas(req, res) {
    console.log("Estoy trayendo objetos", req.body);
  /* var params = req.body;
  
    if (!req.user.sub || !params.receiver) {
      //console.log("entre dentro jaja huevadas");
      return res.status(200).send({
        message: 'Enviar todos los datos necesarios'
      });
    }
  
    var nota = new Nota();
     nota.insumo1= params.insumo1;
     nota.insumo2 =params.insumo2;
     nota.insumo3 =params.insumo3;
     nota.insumo4 =params.insumo4;
     nota.insumo5 =params.insumo5;
     nota.insumo6 =params.insumo6;
     nota.insumo7 =params.insumo7;
     nota.insumo8 =params.insumo8;
     nota.examen1 =params.examen1;
  

     nota.insumo11= params.insumo11;
     nota.insumo22 =params.insumo22;
     nota.insumo33 =params.insumo33;
     nota.insumo44 =params.insumo44;
     nota.insumo55 =params.insumo55;
     nota.insumo66 =params.insumo66;
     nota.insumo77 =params.insumo77;
     nota.insumo88 =params.insumo88;
     nota.examen2 =params.examen2;

     nota.examenSupletorio=params.examenSupletorio;
     nota.examenRemedial=params.examenRemedial;
     nota.examenGracia=nota.examenGracia;
 
  
    nota.save((err, notaStorage) => {
      if (err) {
        return res.status(500).send({
          message: 'Error al asignar viaje'
        });
  
      }
  
      if (!notaStorage) {
        return res.status(400).send({
          message: 'No se asignado correctamente el viaje'
        });
      }
      //console.log("message guardado" + messageStored);
      return res.status(200).send({
        nota: notaStorage
      });
    });*/
  }
  module.exports = {          // para exportar todas las funciones de este modulo

    saveNotas,
 

};