
var Nota = require('../models/nota');

function saveNotas(req, res) {

  var cont = 0;
  var cont2 = 0;
  var paramsi = req.body;
var nota;
  paramsi.forEach(params => {

    Nota.findOne({ '$and': [{ estudiante: params.estudiante }, { periodo: params.periodo }] }, (err, notas) => {
      if (err) {
        res.status(500).send({
          message: "Error al guardar Curso"
        });
      } else {
        if (notas) {
          cont2++;
          updateNotasFin(notas, params, res, cont2, paramsi);


        } else {
          cont++;
          saveNotas2(params, res, cont, paramsi);


        }
      }

    });

  });

}

function saveNotas2(params, res, cont, paramsi) {


  console.log("save notas", params);
  var nota = new Nota();
  nota.materia = params.materia;
  nota.estudiante = params.estudiante;
  nota.periodo = params.periodo;
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
  nota.examenGracia = params.examenGracia;


  nota.save((err, notaStored) => {
    if (err && cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: 'Errro al Generar asignacion'
      });
    } else {
      if (!notaStored && cont == Object.keys(paramsi).length) {
        res.status(404).send({
          message: 'No se ha generado la asignacion'
        });
      } else {
        if (cont == Object.keys(paramsi).length) {
          res.status(200).send({
            message: 'La asignacion se ha generado correctamente'
          });
        }
      }
    }

  });
}


function updateNotasFin(notas, params, res, cont, paramsi) {
  console.log("update", notas._id)
  params._id = notas._id;
  Nota.findByIdAndUpdate(params._id, params, (err, notaUpdate) => {

    if (err && cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: err
      });

    } else {
      if (!notaUpdate && cont == Object.keys(paramsi).length) {
        res.status(404).send({
          message: "la nota no ha podido actualizarse."
        });
      } else {
        if (cont == Object.keys(paramsi).length) {
          res.status(200).send({
            message: "las notas se registraron correctamente."
          });
        }
      }
    }

  });
}

function buscarNotas(req, res) {


  var paramsi = req.body;
  console.log("mostrar el ide que voy a comprar",paramsi);
  var vectorNotas=[];
  var cont2=0;
  paramsi.buscar.forEach(params => {
    
    Nota.find({ '$and': [{ estudiante: params.estudiante._id }, { periodo: params.periodo },{materia: paramsi.materia}] }, (err, notas) => {
      if (err) {
        res.status(500).send({
          message: "Error al guardar Curso"
        });
      } else {
        if (notas) {
         
          cont2++;
         
          vectorNotas.push(notas)
          if (cont2 == Object.keys(paramsi.buscar).length) {
            console.log("estes es el vector de nbotas que regresa",vectorNotas);
            res.status(200).send({
              vectorNotas
            });
          }
        } else {
          cont++;
          if (cont == Object.keys(paramsi).length) {
            res.status(200).send({
              message: "no existen notas registradas"
            });
          }


        }
      }

    });

  });


}


module.exports = {          // para exportar todas las funciones de este modulo

  saveNotas,
  buscarNotas,
  updateNotasFin


};