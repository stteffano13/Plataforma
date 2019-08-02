
var Nota = require('../models/nota');
var NotaB = require('../models/notaB');

function saveNotas(req, res) {

  var cont = 0;
  var cont2 = 0;
  var cont3 = 0;
  var paramsi = req.body;

  console.log("veamos si viene materia", paramsi);
  paramsi.forEach(params => {

    Nota.findOne({ '$and': [{ estudiante: params.estudiante }, { periodo: params.periodo }, { materia: params.materia }] }, (err, notas) => {
      if (err) {
        cont3++;
        if (cont3 == Object.keys(paramsi).length) {
          res.status(500).send({
            message: "Error al guardar Nota"
          });
        }
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
  nota.pt = params.pt;

  nota.save((err, notaStored) => {
    if (err && cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: 'Error al guardar notas'
      });
    } else {
      if (!notaStored && cont == Object.keys(paramsi).length) {
        res.status(404).send({
          message: 'No se han guardado sus notas'
        });
      } else {
        if (cont == Object.keys(paramsi).length) {
          res.status(200).send({
            message: 'Las notas se han guardado correctamente'
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
        console.log("seguro se actualizo", cont, "contra", paramsi);
        if (cont == Object.keys(paramsi).length) {
          res.status(200).send({
            message: "las notas se actualizaron correctamente."
          });
        }
      }
    }

  });
}

function buscarNotas(req, res) {


  var paramsi = req.body;
  console.log("mostrar el ide que voy a comprar", paramsi);
  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;
  paramsi.buscar.forEach(params => {

    Nota.findOne({ '$and': [{ estudiante: params.estudiante._id }, { periodo: params.periodo }, { materia: paramsi.materia }] }).exec((err, notas) => {

      if (err) {
        cont3++
        if (cont == Object.keys(paramsi).length) {
          res.status(500).send({
            message: "Error al buscar Notas"
          });
        }
      } else {
        if (notas) {

         
          
          vectorNotas.push(notas)
          console.log("ver notas que regresa", vectorNotas)
          if (cont2 == Object.keys(paramsi.buscar).length) {
           console.log("ver notas que regresa", vectorNotas)
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


// notas b

function saveNotasB(req, res) {

  var cont = 0;
  var cont2 = 0;
  var cont3 = 0;
  var paramsi = req.body;

  console.log("veamos si viene materia", paramsi);
  paramsi.forEach(params => {

    NotaB.findOne({ '$and': [{ estudiante: params.estudiante }, { periodo: params.periodo }, { materia: params.materia }] }, (err, notasB) => {
      if (err) {
        cont3++;
        if (cont3 == Object.keys(paramsi).length) {
          res.status(500).send({
            message: "Error al guardar Nota"
          });
        }
      } else {
        if (notasB) {
          cont2++;
          updateNotasFinB(notasB, params, res, cont2, paramsi);


        } else {
          cont++;
          saveNotasB2(params, res, cont, paramsi);


        }
      }

    });

  });

}


function saveNotasB2(params, res, cont, paramsi) {
  var notaB = new NotaB();
  notaB.materia = params.materia;
  notaB.estudiante = params.estudiante;
  notaB.periodo = params.periodo;


  notaB.Q1P1insumo1 = params.Q1P1insumo1;
  notaB.Q1P1insumo2 = params.Q1P1insumo2;
  notaB.Q1P1insumo3 = params.Q1P1insumo3;
  notaB.Q1P1insumo4 = params.Q1P1insumo4;
  notaB.Q1P1insumo5 = params.Q1P1insumo5;
  notaB.Q1P1insumo6 = params.Q1P1insumo6;

  notaB.Q1P2insumo1 = params.Q1P2insumo1;
  notaB.Q1P2insumo2 = params.Q1P2insumo2;
  notaB.Q1P2insumo3 = params.Q1P2insumo3;
  notaB.Q1P2insumo4 = params.Q1P2insumo4;
  notaB.Q1P2insumo5 = params.Q1P2insumo5;
  notaB.Q1P2insumo6 = params.Q1P2insumo6;

  notaB.Q1P3insumo1 = params.Q1P3insumo1;
  notaB.Q1P3insumo2 = params.Q1P3insumo2;
  notaB.Q1P3insumo3 = params.Q1P3insumo3;
  notaB.Q1P3insumo4 = params.Q1P3insumo4;
  notaB.Q1P3insumo5 = params.Q1P3insumo5;
  notaB.Q1P3insumo6 = params.Q1P3insumo6;

  notaB.examen1 = params.examen1;

  notaB.Q2P1insumo1 = params.Q2P1insumo1;
  notaB.Q2P1insumo2 = params.Q2P1insumo2;
  notaB.Q2P1insumo3 = params.Q2P1insumo3;
  notaB.Q2P1insumo4 = params.Q2P1insumo4;
  notaB.Q2P1insumo5 = params.Q2P1insumo5;
  notaB.Q2P1insumo6 = params.Q1P1insumo6;

  notaB.Q2P2insumo1 = params.Q2P2insumo1;
  notaB.Q2P2insumo2 = params.Q2P2insumo2;
  notaB.Q2P2insumo3 = params.Q2P2insumo3;
  notaB.Q2P2insumo4 = params.Q2P2insumo4;
  notaB.Q2P2insumo5 = params.Q2P2insumo5;
  notaB.Q2P2insumo6 = params.Q2P2insumo6;

  notaB.Q2P3insumo1 = params.Q2P3insumo1;
  notaB.Q2P3insumo2 = params.Q2P3insumo2;
  notaB.Q2P3insumo3 = params.Q2P3insumo3;
  notaB.Q2P3insumo4 = params.Q2P3insumo4;
  notaB.Q2P3insumo5 = params.Q2P3insumo5;
  notaB.Q2P3insumo6 = params.Q2P3insumo6;

  notaB.examen2 = params.examen2;

  notaB.examenSupletorio = params.examenSupletorio;
  notaB.examenRemedial = params.examenRemedial;
  notaB.examenGracia = params.examenGracia;
  notaB.pt = params.pt;

  notaB.save((err, notaStored) => {
    if (err && cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: 'Error al guardar notas'
      });
    } else {
      if (!notaStored && cont == Object.keys(paramsi).length) {
        res.status(404).send({
          message: 'No se han guardado las notas'
        });
      } else {
        if (cont == Object.keys(paramsi).length) {
          res.status(200).send({
            message: 'Las notas se han guardado correctamente'
          });
        }
      }
    }

  });
}



function updateNotasFinB(notas, params, res, cont, paramsi) {
  console.log("update", notas._id)
  params._id = notas._id;
  NotaB.findByIdAndUpdate(params._id, params, (err, notaUpdate) => {

    if (err && cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: err
      });

    } else {
      if (!notaUpdate && cont == Object.keys(paramsi).length) {
        res.status(404).send({
          message: "las notas no ha podido actualizarse."
        });
      } else {
        console.log("seguro se actualizo", cont, "contra", paramsi);
        if (cont == Object.keys(paramsi).length) {
          res.status(200).send({
            message: "las notas se registraron correctamente."
          });
        }
      }
    }

  });
}


function buscarNotasB(req, res) {


  var paramsi = req.body;
  console.log("mostrar el ide que voy a comprar notas b", paramsi);
  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;
  paramsi.buscar.forEach(params => {
    console.log("notas b params estudiante id", params.estudiante._id, params.periodo, paramsi.materia)
    NotaB.findOne({ '$and': [{ estudiante: params.estudiante._id }, { periodo: params.periodo }, { materia: paramsi.materia }] }).sort({ $natural: -1 }).exec((err, notas) => {

      if (err) {
        cont3++
        if (cont == Object.keys(paramsi).length) {
          res.status(500).send({
            message: "Error al guardar Curso"
          });
        }
      } else {
        if (notas) {

          cont2++;

          vectorNotas.push(notas)
          if (cont2 == Object.keys(paramsi.buscar).length) {
            console.log("estes es el vector de nbotas que regresa", vectorNotas);
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



function buscarNotasEstudiante(req, res) {
  console.log("entre a sacar als notas de las materias");
  var estudianteE = req.user.sub;
  var periodoE = req.body.fecha;

  var vectorNotas = [];


  Nota.find({ '$and': [{ estudiante: estudianteE }, { periodo: periodoE }] }).sort({ $natural: -1 }).exec((err, notas) => {

    if (err) {


      res.status(500).send({
        message: "Error al buscar nota"

      });
    } else {
      if (notas) {


        console.log("estes es el vector de toditititas las notas que regresa", notas);
        res.status(200).send({
          notas
        });
      }
      else {

        res.status(200).send({
          message: "no existen notas registradas"
        });



      }
    }

  });



}


function buscarNotasEstudianteB(req, res) {
  console.log("entre a sacar als notas de las materias");
  var estudianteE = req.user.sub;
  var periodoE = req.body.fecha;

  console.log("notas del estudiante ull params estudiante id", estudianteE, periodoE);
  NotaB.find({ '$and': [{ estudiante: estudianteE }, { periodo: periodoE }] }).sort({ $natural: -1 }).exec((err, notas) => {

    if (err) {


      res.status(500).send({
        message: "Error al buscar nota"

      });
    } else {
      if (notas) {

        console.log("estes es el vector de toditititas las notas  Basica que regresa", notas);
        res.status(200).send({
          notas
        });
      }
      else {

        res.status(200).send({
          message: "no existen notas registradas"
        });



      }
    }

  });



}



function buscarNotasMatris(req, res) {

  var paramsi = req.body;

  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;

var contM =Object.keys(paramsi.materias).length;
var contE= Object.keys(paramsi.buscar).length;
var multi = contM * contE;

console.log("esta es la multiplicacion de los vectores",multi);
  paramsi.buscar.forEach(params => {
    paramsi.materias.forEach(paramsM => {
      console.log("estudiante", params.estudiante._id,  "materia", paramsM._id);

      Nota.findOne({ '$and': [{ estudiante: params.estudiante._id }, { periodo: params.periodo }, { materia: paramsM._id }] }).sort({ $natural: -1 }).exec((err, notas) => {

        if (err) {
          cont3++
          if (cont == multi ) {
            res.status(500).send({
              message: "Error al guardar Curso"
            });
          }
        } else {
          if (notas) {
            console.log("materias una por una  mijo", notas);
            cont2++;

            vectorNotas.push(notas);
            if (cont2 == multi ) {
              console.log("estes es el vector de nbotas que regresa para l matris", vectorNotas);
              res.status(200).send({
                vectorNotas
              });
            }
         
          } else {
            cont++;
            if (cont ==  multi ) {
              res.status(200).send({
                message: "no existen notas registradas"
              });
            }


          }
        }

      });

    });

  });


}


function buscarNotasMatrisB(req, res) {

  var paramsi = req.body;

  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;

var contM =Object.keys(paramsi.materias).length;
var contE= Object.keys(paramsi.buscar).length;
var multi = contM * contE;

console.log("esta es la multiplicacion de los vectores",multi);
  paramsi.buscar.forEach(params => {
    paramsi.materias.forEach(paramsM => {
      console.log("estudiante", params.estudiante._id,  "materia", paramsM._id);

      NotaB.findOne({ '$and': [{ estudiante: params.estudiante._id }, { periodo: params.periodo }, { materia: paramsM._id }] }).sort({ $natural: -1 }).exec((err, notas) => {

        if (err) {
          cont3++
          if (cont == multi ) {
            res.status(500).send({
              message: "Error al optener promedios finales"
            });
          }
        } else {
          if (notas) {
            console.log("materias una por una", notas);
            cont2++;

            vectorNotas.push(notas);
            if (cont2 == multi ) {
              console.log("estes es el vector de nbotas que regresa para l matris", vectorNotas);
              res.status(200).send({
                vectorNotas
              });
            }
         
          } else {
            cont++;
            if (cont ==  multi ) {
              res.status(200).send({
                message: "no existen notas registradas"
              });
            }


          }
        }

      });

    });

  });


}

module.exports = {          // para exportar todas las funciones de este modulo

  saveNotas,
  buscarNotas,
  updateNotasFin,
  saveNotasB,
  buscarNotasB,
  buscarNotasEstudiante,
  buscarNotasEstudianteB,
  buscarNotasMatris,
  buscarNotasMatrisB


};