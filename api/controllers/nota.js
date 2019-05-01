
var Nota = require('../models/nota');

function saveNotas(req, res) {

  var cont = 0;
  var cont2=0;
  var paramsi = req.body;

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


  console.log("contador", cont, "lenght", Object.keys(paramsi).length);
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
  nota.examenGracia = nota.examenGracia;


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


 function updateNotasFin(notas, params, res, cont, paramsi)
{
  console.log("update", notas._id)
  params._id=notas._id;
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
        if(cont == Object.keys(paramsi).length){
        res.status(200).send({
          message: "las notas se registraron correctamente."
        });
      }
      }
    }

  });
}

function buscarNotas(req, res) {
  var busqueda = req.params.busqueda;
  console.log(busqueda);
  if (!busqueda) {
    res.status(404).send({
      message: 'Ingrese un parametro de busqueda'
    });
  } else {


    var matriculas = Materia.find({
      estado: '0'
    }).populate({
      path: 'docente'
    }).populate({
      path: 'curso'
    }).exec((err, materias) => {
      if (err) {
        return res.status(500).send({
          message: 'No se han podido obtener sus Viajes'
        });
      }

      if (!materias) {
        return res.status(200).send({
          message: 'No tiene viajes'
        });
      }

      return res.status(200).send({
        materias
      });
    });
  }
}

module.exports = {          // para exportar todas las funciones de este modulo

  saveNotas,
  buscarNotas,
  updateNotasFin


};