
var Nota = require('../models/nota');

function saveNotas(req, res) {
  
 
  var paramsi = req.body;

  paramsi.forEach(params => {
 
  Nota.findOne({ '$and': [{ estudiante: params.estudiante }, { periodo: params.periodo }] }, (err, users) => {
    if (err) {
      res.status(500).send({
        message: "Error al guardar Curso"
      });
    } else {
      if (users) {

      //  updateNotas();


      } else {

    saveNotas2(params, res);


      }
    }

  });

});
return res.status(200).send({
  message: "Las notas se han registrado satisfactoriamente"
 });
}

  function saveNotas2(params, res)
  {
 
    var nota = new Nota();
    nota.materia=params.materia;
    nota.estudiante=params.estudiante;
    nota.periodo=params.periodo;
    nota.insumo1 = params.insumo1;
    nota.insumo2 = params.insumo2;
    nota.insumo3 = params.insumo3;
    nota.insumo4 = params.insumo4;
    nota.insumo5 = params.insumo5;
    nota.insumo6 = params.insumo6;
    nota.insumo7 = params.insumo7;
    nota.insumo8 = params.insumo8;
    nota.examen1 = params.examen1;


    nota.insumo11 = params.insumo11;
    nota.insumo22 = params.insumo22;
    nota.insumo33 = params.insumo33;
    nota.insumo44 = params.insumo44;
    nota.insumo55 = params.insumo55;
    nota.insumo66 = params.insumo66;
    nota.insumo77 = params.insumo77;
    nota.insumo88 = params.insumo88;
    nota.examen2 = params.examen2;

    nota.examenSupletorio = params.examenSupletorio;
    nota.examenRemedial = params.examenRemedial;
    nota.examenGracia = nota.examenGracia;


    nota.save(() => {

     
    });
  }



module.exports = {          // para exportar todas las funciones de este modulo

  saveNotas,


};