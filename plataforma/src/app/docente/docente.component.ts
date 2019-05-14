import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';
import { DocenteService } from '../services/docente.services';
import { NotaService } from '../services/nota.services';
import { Nota } from '../models/nota';
import { NotaBasica } from '../models/notaBasica';
import { Calculable } from '../models/calculable';
import { isNumber } from 'util';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {


  constructor(private _materiaService: MateriaService,
    private _administradorService: AdministradorService,
    private _matriculaServices: MatriculaService,
    private _notaService: NotaService, private _docenteService:DocenteService) { }

public Titulo1;
public Titulo2;
  public guardarMateriaMatricula;
  // banderas bloquer input

  public banderInsumo1 = false;
  public banderInsumo2 = false;
  public banderInsumo3 = false;
  public banderInsumo4 = false;
  public banderInsumo5 = false;
  public banderInsumo6 = false;
  public banderInsumo7 = false;
  public banderInsumo8 = false;

  // fin bloquear botones

  // aparecer  tabla 

  public banderTabla1 = false;
  public banderTabla2 = false;



  public btnFinalizar = true;
  public banderAux = false;
  public btnFinalizar2 = true;


  public mensajeerrormodal;
  public loading;
  public periodoLectivoActual;
  public listadoEstudianteMatriculas;
  public listadoEstudianteNotas;


  public vectorListadoMisMaterias;
  public obj: Nota;
  public objC: Calculable;

  public objB: NotaBasica;
  public objCB: Calculable;

  public mensajecorrectomodals;
  public mensajeerrormodals;

  // vectores
  public object = [];

  public objectCalculable = [];

  public objectB = [];

  public objectCalculableB = []


  ngOnInit() {
    this.getListadoMisMaterias();
    this.getPeriodoActual();

  }

  pruebaclick() {
    this.banderAux = false;
    for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {
      document.getElementById("tdbuttonGuardar" + i).click();
      console.log(this.object);
    }
  }


  prueba(value, i) {
    console.log("antes de mandar la materia index  es", i)
    this.object[i].estudiante = value.estudiante._id;
    this.object[i].materia = this.vectorListadoMisMaterias[0]._id;
    this.object[i].periodo = this.periodoLectivoActual;

    this.calculos(i);

  }


  pruebaB(value, i) {
    console.log("antes de mandar la materia index Basico es", this.guardarMateriaMatricula)
    this.objectB[i].estudiante = value.estudiante._id;
    this.objectB[i].materia = this.guardarMateriaMatricula;
    this.objectB[i].periodo = this.periodoLectivoActual;

    this.calculosB(i);

  }


  calculosB(i) {


    if (this.objectB[i].Q1P1insumo1 > 10 || this.objectB[i].Q1P1insumo2 > 10 || this.objectB[i].Q1P1insumo3 > 10
      || this.objectB[i].Q1P1insumo4 > 10 || this.objectB[i].Q1P1insumo5 > 10 || this.objectB[i].Q1P1insumo6 > 10

      || this.objectB[i].Q1P2insumo1 > 10 || this.objectB[i].Q1P2insumo2 > 10 || this.objectB[i].Q1P2insumo3 > 10
      || this.objectB[i].Q1P2insumo4 > 10 || this.objectB[i].Q1P2insumo5 > 10 || this.objectB[i].Q1P2insumo6 > 10

      || this.objectB[i].Q1P3insumo1 > 10 || this.objectB[i].Q1P3insumo2 > 10 || this.objectB[i].Q1P3insumo3 > 10
      || this.objectB[i].Q1P3insumo4 > 10 || this.objectB[i].Q1P3insumo5 > 10 || this.objectB[i].Q1P3insumo6 > 10
      || this.objectB[i].examen1 > 10

      || this.objectB[i].Q2P1insumo1 > 10 || this.objectB[i].Q2P1insumo2 > 10 || this.objectB[i].Q2P1insumo3 > 10
      || this.objectB[i].Q2P1insumo4 > 10 || this.objectB[i].Q2P1insumo5 > 10 || this.objectB[i].Q2P1insumo6 > 10

      || this.objectB[i].Q2P2insumo1 > 10 || this.objectB[i].Q2P2insumo2 > 10 || this.objectB[i].Q2P2insumo3 > 10
      || this.objectB[i].Q2P2insumo4 > 10 || this.objectB[i].Q2P2insumo5 > 10 || this.objectB[i].Q2P2insumo6 > 10

      || this.objectB[i].Q2P3insumo1 > 10 || this.objectB[i].Q2P3insumo2 > 10 || this.objectB[i].Q2P3insumo3 > 10
      || this.objectB[i].Q2P3insumo4 > 10 || this.objectB[i].Q2P3insumo5 > 10 || this.objectB[i].Q2P3insumo6 > 10

      || this.objectB[i].examen2 > 10 || this.objectB[i].examenGracia > 10 || this.objectB[i].examenRemedial > 10 || this.objectB[i].examenSupletorio > 10) {
      this.btnFinalizar2 = true;
      this.banderAux = true;
      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";

      document.getElementById("openModalError").click();

    } else {
      if (this.banderAux) { this.btnFinalizar2 = true; } else { this.btnFinalizar2 = false; }


      var ochentaporciento1 = ((parseFloat(this.objectB[i].Q1P1insumo1) + parseFloat(this.objectB[i].Q1P1insumo2)
        + parseFloat(this.objectB[i].Q1P1insumo3) + parseFloat(this.objectB[i].Q1P1insumo4) + parseFloat(this.objectB[i].Q1P1insumo5)
        + parseFloat(this.objectB[i].Q1P1insumo6) +

        parseFloat(this.objectB[i].Q1P2insumo1) + parseFloat(this.objectB[i].Q1P2insumo2) + parseFloat(this.objectB[i].Q1P2insumo3) +
        + parseFloat(this.objectB[i].Q1P2insumo4) + parseFloat(this.objectB[i].Q1P2insumo5) + parseFloat(this.objectB[i].Q1P2insumo6) +

        parseFloat(this.objectB[i].Q1P3insumo1) + parseFloat(this.objectB[i].Q1P3insumo2) + parseFloat(this.objectB[i].Q1P3insumo3) +
        parseFloat(this.objectB[i].Q1P3insumo4) + parseFloat(this.objectB[i].Q1P3insumo5) + parseFloat(this.objectB[i].Q1P3insumo6)) / 18) * 0.8;


      var veinteporciento1 = parseFloat(this.objectB[i].examen1) * 0.2;

      var promedio1 = ochentaporciento1 + veinteporciento1

      var ochentaporciento2 = ((parseFloat(this.objectB[i].Q2P1insumo1) + parseFloat(this.objectB[i].Q2P1insumo2)
        + parseFloat(this.objectB[i].Q2P1insumo3) + parseFloat(this.objectB[i].Q2P1insumo4) + parseFloat(this.objectB[i].Q2P1insumo5)
        + parseFloat(this.objectB[i].Q1P1insumo6) +

        parseFloat(this.objectB[i].Q2P2insumo1) + parseFloat(this.objectB[i].Q2P2insumo2) + parseFloat(this.objectB[i].Q2P2insumo3)
        + parseFloat(this.objectB[i].Q2P2insumo4) + parseFloat(this.objectB[i].Q2P2insumo5) + parseFloat(this.objectB[i].Q2P2insumo6) +

        parseFloat(this.objectB[i].Q2P3insumo1) + parseFloat(this.objectB[i].Q2P3insumo2) + parseFloat(this.objectB[i].Q2P3insumo3) +
        parseFloat(this.objectB[i].Q2P3insumo4) + parseFloat(this.objectB[i].Q2P3insumo5) + parseFloat(this.objectB[i].Q2P3insumo6)) / 18) * 0.8;


      var veinteporciento2 = parseFloat(this.objectB[i].examen2) * 0.2;
      var promedio2 = ochentaporciento2 + veinteporciento2
      var promedioPeriodo = (promedio1 + promedio2) / 2;


      this.objectCalculableB[i].ochentaporciento1 = ochentaporciento1.toFixed(2);
      this.objectCalculableB[i].veinteporciento1 = veinteporciento1.toFixed(2);
      this.objectCalculableB[i].promedio1 = promedio1.toFixed(2);
      this.objectCalculableB[i].ochentaporciento2 = ochentaporciento2.toFixed(2);
      this.objectCalculableB[i].veinteporciento2 = veinteporciento2.toFixed(2);
      this.objectCalculableB[i].promedio2 = promedio2.toFixed(2);
      this.objectCalculableB[i].promedioPeriodo = promedioPeriodo.toFixed(2);


    }
  }





  calculos(i) {


    if (this.object[i].insumo1 > 10 || this.object[i].insumo2 > 10 || this.object[i].insumo3 > 10 || this.object[i].insumo4 > 10
      || this.object[i].insumo5 > 10 || this.object[i].insumo6 > 10 || this.object[i].insumo7 > 10 || this.object[i].insumo8 > 10
      || this.object[i].examen1 > 10 || this.object[i].insumo11 > 10 || this.object[i].insumo22 > 10 || this.object[i].insumo33 > 10
      || this.object[i].insumo44 > 10 || this.object[i].insumo55 > 10 || this.object[i].insumo66 > 10 || this.object[i].insumo77 > 10
      || this.object[i].insumo88 > 10 || this.object[i].examen2 > 10 || this.object[i].examenGracia > 10
      || this.object[i].examenRemedial > 10 || this.object[i].examenSupletorio > 10) {
      this.btnFinalizar = true;
      this.banderAux = true;
      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";

      document.getElementById("openModalError").click();

    } else {
      if (this.banderAux) { this.btnFinalizar = true; } else { this.btnFinalizar = false; }

      var ochentaporciento1 = ((parseFloat(this.object[i].insumo1) + parseFloat(this.object[i].insumo2)
        + parseFloat(this.object[i].insumo3) + parseFloat(this.object[i].insumo4) + parseFloat(this.object[i].insumo5)
        + parseFloat(this.object[i].insumo6) + parseFloat(this.object[i].insumo7) + parseFloat(this.object[i].insumo8)) / 8) * 0.8;


      var veinteporciento1 = parseFloat(this.object[i].examen1) * 0.2;

      var promedio1 = ochentaporciento1 + veinteporciento1

      var ochentaporciento2 = ((parseFloat(this.object[i].insumo11) + parseFloat(this.object[i].insumo22)
        + parseFloat(this.object[i].insumo33) + parseFloat(this.object[i].insumo44) + parseFloat(this.object[i].insumo55)
        + parseFloat(this.object[i].insumo66) + parseFloat(this.object[i].insumo77) + parseFloat(this.object[i].insumo88)) / 8) * 0.8;

      var veinteporciento2 = parseFloat(this.object[i].examen2) * 0.2;
      var promedio2 = ochentaporciento2 + veinteporciento2
      var promedioPeriodo = (promedio1 + promedio2) / 2;


      this.objectCalculable[i].ochentaporciento1 = ochentaporciento1.toFixed(2);
      this.objectCalculable[i].veinteporciento1 = veinteporciento1.toFixed(2);
      this.objectCalculable[i].promedio1 = promedio1.toFixed(2);
      this.objectCalculable[i].ochentaporciento2 = ochentaporciento2.toFixed(2);
      this.objectCalculable[i].veinteporciento2 = veinteporciento2.toFixed(2);
      this.objectCalculable[i].promedio2 = promedio2.toFixed(2);
      this.objectCalculable[i].promedioPeriodo = promedioPeriodo.toFixed(2);


    }
  }


  calculosBInit(i) {


    if (this.objectB[i].Q1P1insumo1 > 10 || this.objectB[i].Q1P1insumo2 > 10 || this.objectB[i].Q1P1insumo3 > 10
      || this.objectB[i].Q1P1insumo4 > 10 || this.objectB[i].Q1P1insumo5 > 10 || this.objectB[i].Q1P1insumo6 > 10

      || this.objectB[i].Q1P2insumo1 > 10 || this.objectB[i].Q1P2insumo2 > 10 || this.objectB[i].Q1P2insumo3 > 10
      || this.objectB[i].Q1P2insumo4 > 10 || this.objectB[i].Q1P2insumo5 > 10 || this.objectB[i].Q1P2insumo6 > 10

      || this.objectB[i].Q1P3insumo1 > 10 || this.objectB[i].Q1P3insumo2 > 10 || this.objectB[i].Q1P3insumo3 > 10
      || this.objectB[i].Q1P3insumo4 > 10 || this.objectB[i].Q1P3insumo5 > 10 || this.objectB[i].Q1P3insumo6 > 10
      || this.objectB[i].examen1 > 10

      || this.objectB[i].Q2P1insumo1 > 10 || this.objectB[i].Q2P1insumo2 > 10 || this.objectB[i].Q2P1insumo3 > 10
      || this.objectB[i].Q2P1insumo4 > 10 || this.objectB[i].Q2P1insumo5 > 10 || this.objectB[i].Q2P1insumo6 > 10

      || this.objectB[i].Q2P2insumo1 > 10 || this.objectB[i].Q2P2insumo2 > 10 || this.objectB[i].Q2P2insumo3 > 10
      || this.objectB[i].Q2P2insumo4 > 10 || this.objectB[i].Q2P2insumo5 > 10 || this.objectB[i].Q2P2insumo6 > 10

      || this.objectB[i].Q2P3insumo1 > 10 || this.objectB[i].Q2P3insumo2 > 10 || this.objectB[i].Q2P3insumo3 > 10
      || this.objectB[i].Q2P3insumo4 > 10 || this.objectB[i].Q2P3insumo5 > 10 || this.objectB[i].Q2P3insumo6 > 10

      || this.objectB[i].examen2 > 10 || this.objectB[i].examenGracia > 10 || this.objectB[i].examenRemedial > 10 || this.objectB[i].examenSupletorio > 10) {
      this.btnFinalizar2 = true;
      this.banderAux = true;
      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";

      document.getElementById("openModalError").click();

    } else {



      var ochentaporciento1 = ((parseFloat(this.objectB[i].Q1P1insumo1) + parseFloat(this.objectB[i].Q1P1insumo2)
        + parseFloat(this.objectB[i].Q1P1insumo3) + parseFloat(this.objectB[i].Q1P1insumo4) + parseFloat(this.objectB[i].Q1P1insumo5)
        + parseFloat(this.objectB[i].Q1P1insumo6) +

        parseFloat(this.objectB[i].Q1P2insumo1) + parseFloat(this.objectB[i].Q1P2insumo2) + parseFloat(this.objectB[i].Q1P2insumo3) +
        + parseFloat(this.objectB[i].Q1P2insumo4) + parseFloat(this.objectB[i].Q1P2insumo5) + parseFloat(this.objectB[i].Q1P2insumo6) +

        parseFloat(this.objectB[i].Q1P3insumo1) + parseFloat(this.objectB[i].Q1P3insumo2) + parseFloat(this.objectB[i].Q1P3insumo3) +
        parseFloat(this.objectB[i].Q1P3insumo4) + parseFloat(this.objectB[i].Q1P3insumo5) + parseFloat(this.objectB[i].Q1P3insumo6)) / 18) * 0.8;


      var veinteporciento1 = parseFloat(this.objectB[i].examen1) * 0.2;

      var promedio1 = ochentaporciento1 + veinteporciento1

      var ochentaporciento2 = ((parseFloat(this.objectB[i].Q2P1insumo1) + parseFloat(this.objectB[i].Q2P1insumo2)
        + parseFloat(this.objectB[i].Q2P1insumo3) + parseFloat(this.objectB[i].Q2P1insumo4) + parseFloat(this.objectB[i].Q2P1insumo5)
        + parseFloat(this.objectB[i].Q1P1insumo6) +

        parseFloat(this.objectB[i].Q2P2insumo1) + parseFloat(this.objectB[i].Q2P2insumo2) + parseFloat(this.objectB[i].Q2P2insumo3)
        + parseFloat(this.objectB[i].Q2P2insumo4) + parseFloat(this.objectB[i].Q2P2insumo5) + parseFloat(this.objectB[i].Q2P2insumo6) +

        parseFloat(this.objectB[i].Q2P3insumo1) + parseFloat(this.objectB[i].Q2P3insumo2) + parseFloat(this.objectB[i].Q2P3insumo3) +
        parseFloat(this.objectB[i].Q2P3insumo4) + parseFloat(this.objectB[i].Q2P3insumo5) + parseFloat(this.objectB[i].Q2P3insumo6)) / 18) * 0.8;


      var veinteporciento2 = parseFloat(this.objectB[i].examen2) * 0.2;
      var promedio2 = ochentaporciento2 + veinteporciento2
      var promedioPeriodo = (promedio1 + promedio2) / 2;


      this.objectCalculableB[i].ochentaporciento1 = ochentaporciento1.toFixed(2);
      this.objectCalculableB[i].veinteporciento1 = veinteporciento1.toFixed(2);
      this.objectCalculableB[i].promedio1 = promedio1.toFixed(2);
      this.objectCalculableB[i].ochentaporciento2 = ochentaporciento2.toFixed(2);
      this.objectCalculableB[i].veinteporciento2 = veinteporciento2.toFixed(2);
      this.objectCalculableB[i].promedio2 = promedio2.toFixed(2);
      this.objectCalculableB[i].promedioPeriodo = promedioPeriodo.toFixed(2);


    }
  }

  calculosInit(i) {
    this.btnFinalizar = true;
    if (this.object[i].insumo1 > 10 || this.object[i].insumo2 > 10 || this.object[i].insumo3 > 10 || this.object[i].insumo4 > 10
      || this.object[i].insumo5 > 10 || this.object[i].insumo6 > 10 || this.object[i].insumo7 > 10 || this.object[i].insumo8 > 10
      || this.object[i].examen1 > 10 || this.object[i].insumo11 > 10 || this.object[i].insumo22 > 10 || this.object[i].insumo33 > 10
      || this.object[i].insumo44 > 10 || this.object[i].insumo55 > 10 || this.object[i].insumo66 > 10 || this.object[i].insumo77 > 10
      || this.object[i].insumo88 > 10 || this.object[i].examen2 > 10 || this.object[i].examenGracia > 10
      || this.object[i].examenRemedial > 10 || this.object[i].examenSupletorio > 10) {

      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";
      document.getElementById("openModalError").click();

    } else {

      var ochentaporciento1 = ((parseFloat(this.object[i].insumo1) + parseFloat(this.object[i].insumo2)
        + parseFloat(this.object[i].insumo3) + parseFloat(this.object[i].insumo4) + parseFloat(this.object[i].insumo5)
        + parseFloat(this.object[i].insumo6) + parseFloat(this.object[i].insumo7) + parseFloat(this.object[i].insumo8)) / 8) * 0.8;

      var veinteporciento1 = parseFloat(this.object[i].examen1) * 0.2;
      var promedio1 = ochentaporciento1 + veinteporciento1
      var ochentaporciento2 = ((parseFloat(this.object[i].insumo11) + parseFloat(this.object[i].insumo22)
        + parseFloat(this.object[i].insumo33) + parseFloat(this.object[i].insumo44) + parseFloat(this.object[i].insumo55)
        + parseFloat(this.object[i].insumo66) + parseFloat(this.object[i].insumo77) + parseFloat(this.object[i].insumo88)) / 8) * 0.8;

      var veinteporciento2 = parseFloat(this.object[i].examen2) * 0.2;

      var promedio2 = ochentaporciento2 + veinteporciento2

      var promedioPeriodo = (promedio1 + promedio2) / 2;

      this.objectCalculable[i].ochentaporciento1 = ochentaporciento1.toFixed(2);
      this.objectCalculable[i].veinteporciento1 = veinteporciento1.toFixed(2);
      this.objectCalculable[i].promedio1 = promedio1.toFixed(2);
      this.objectCalculable[i].ochentaporciento2 = ochentaporciento2.toFixed(2);
      this.objectCalculable[i].veinteporciento2 = veinteporciento2.toFixed(2);
      this.objectCalculable[i].promedio2 = promedio2.toFixed(2);
      this.objectCalculable[i].promedioPeriodo = promedioPeriodo.toFixed(2);



    }
  }

  // esto puede servir pero aun no ocupo

  bloqueo(i) {



    if (this.object[i].insumo1 != 0) { this.banderInsumo1 = true; }
    if (this.object[i].insumo2 != 0) { this.banderInsumo2 = true; }
    if (this.object[i].insumo3 != 0) { this.banderInsumo3 = true; }
    if (this.object[i].insumo4 != 0) { this.banderInsumo4 = true; }
    if (this.object[i].insumo5 != 0) { this.banderInsumo5 = true; }
    if (this.object[i].insumo6 != 0) { this.banderInsumo6 = true; }
    if (this.object[i].insumo7 != 0) { this.banderInsumo7 = true; }
    if (this.object[i].insumo8 != 0) { this.banderInsumo8 = true }
    if (this.object[i].examen1 != 0) { }
    if (this.object[i].insumo11 != 0) { }
    if (this.object[i].insumo22 != 0) { }

    if (this.object[i].insumo33 != 0) { }

    if (this.object[i].insumo44 != 0) { }

    if (this.object[i].insumo55 != 10) { }

    if (this.object[i].insumo66 != 0) {

    }

    if (this.object[i].insumo77 != 0) { }

    if (this.object[i].insumo88 != 0) { }

    if (this.object[i].examen2 != 0) { }

    if (this.object[i].examenGracia != 0) { }


    if (this.object[i].examenRemedial != 0) { }

    if (this.object[i].examenSupletorio > 10) {


    }
  }


  habilitarGR() {
    this.btnFinalizar = true;
  }
  habilitarGRB() {
    this.btnFinalizar2 = true;
  }

  getListadoMisMaterias() {

    this.vectorListadoMisMaterias = [];
    this._materiaService.getListadoMioMateria().subscribe(response => {

      if (response.materias[0] != undefined) {
        this.vectorListadoMisMaterias = response.materias;

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getPeriodoActual() {


    this._administradorService.getPeriodoActual().subscribe(response => {
      console.log("este es el periodo que vino", response.periodo)
      if (response.periodo != undefined) {
        this.periodoLectivoActual = response.periodo[0].periodo;

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  asignarMateriaCurso(value) {
    this.object = [];
    this.objectCalculable = [];
    this.objectB = [];
    this.objectCalculableB = [];


    var busqueda = value.split(",");
    this.loading = true;
    this.Titulo1= busqueda[2];
    this.Titulo2=busqueda[3];
    this.guardarMateriaMatricula = busqueda[1];
    this._matriculaServices.buscarEstudianteMatricula(busqueda[0]).subscribe(
      response => {


        this.listadoEstudianteMatriculas = response.matriculas;

        console.log("para habilitar  tablas", busqueda[2]);

        if (this.listadoEstudianteMatriculas != "" && busqueda[2] != "BÁSICO SUPERIOR INTENSIVO") {
          this.banderTabla1 = true;
          this.banderTabla2 = false;

          for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {

            this.object.push(this.obj = new Nota("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
            this.objectCalculable.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));

          }
         
          console.log("estas es la materia a busca",busqueda[1]);

        
          var objBuscarNotas = {

            materia: busqueda[1],
            buscar: this.listadoEstudianteMatriculas
          }
          this.traerNotas(objBuscarNotas);
          this.traerNotasB(objBuscarNotas);

        } else {

         
          this.loading = false;
          this.banderTabla1 = false;
          this.banderTabla2 = true;


          for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {

            this.objectB.push(this.objB = new NotaBasica("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
            this.objectCalculableB.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));

          }
          console.log("estas es la materia a busca",busqueda[1]);
          var objBuscarNotas = {

            materia: busqueda[1],
            buscar: this.listadoEstudianteMatriculas
          }
          this.traerNotasB(objBuscarNotas);
        }




      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );

  }


  traerNotas(value) {
    console.log("value curso para nota", value);

    this._notaService.buscarNotas(value).subscribe(
      response => {
        this.loading = false;
        this.listadoEstudianteNotas = response.vectorNotas;

        //  ordenar
        let i = 0;
        this.listadoEstudianteMatriculas.forEach(elementE => {

          this.listadoEstudianteNotas.forEach(element => {

            console.log("elementoE", elementE.estudiante._id, "elemento", element[0].estudiante)

            if (elementE.estudiante._id == element[0].estudiante) {
              this.object[i].insumo1 = element[0].insumo1;
              this.object[i].insumo2 = element[0].insumo2;
              this.object[i].insumo3 = element[0].insumo3;
              this.object[i].insumo4 = element[0].insumo4;
              this.object[i].insumo5 = element[0].insumo5;
              this.object[i].insumo6 = element[0].insumo6;
              this.object[i].insumo7 = element[0].insumo7;
              this.object[i].insumo8 = element[0].insumo8;
              this.object[i].examen1 = element[0].examen1;

              this.object[i].insumo11 = element[0].insumo11;
              this.object[i].insumo22 = element[0].insumo22;
              this.object[i].insumo33 = element[0].insumo33;
              this.object[i].insumo44 = element[0].insumo44;
              this.object[i].insumo55 = element[0].insumo55;
              this.object[i].insumo66 = element[0].insumo66;
              this.object[i].insumo77 = element[0].insumo77;
              this.object[i].insumo88 = element[0].insumo88;

              this.object[i].examen2 = element[0].examen2;
              this.object[i].examenSupletorio = element[0].examenSupletorio;
              this.object[i].examenRemedial = element[0].examenRemedial;
              this.object[i].examenGracia = element[0].examenGracia;

              this.calculosInit(i);
              i++;

            }
          });
        });



        this.loading = false;

      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );

  }



  traerNotasB(value) {
    console.log("value curso para nota", value);

    this._notaService.buscarNotasB(value).subscribe(
      response => {
        this.loading = false;
        this.listadoEstudianteNotas = response.vectorNotas;
        console.log(this.listadoEstudianteMatriculas);
        //  ordenar
        let i = 0;
        this.listadoEstudianteMatriculas.forEach(elementE => {

          this.listadoEstudianteNotas.forEach(element => {


            if (element[0] != null) {
              if (elementE.estudiante._id == element[0].estudiante) {
                this.objectB[i].Q1P1insumo1 = element[0].Q1P1insumo1;
                this.objectB[i].Q1P1insumo2 = element[0].Q1P1insumo2;
                this.objectB[i].Q1P1insumo3 = element[0].Q1P1insumo3;
                this.objectB[i].Q1P1insumo4 = element[0].Q1P1insumo4;
                this.objectB[i].Q1P1insumo5 = element[0].Q1P1insumo5;
                this.objectB[i].Q1P1insumo6 = element[0].Q1P1insumo6;

                this.objectB[i].Q1P2insumo1 = element[0].Q1P2insumo1;
                this.objectB[i].Q1P2insumo2 = element[0].Q1P2insumo2;
                this.objectB[i].Q1P2insumo3 = element[0].Q1P2insumo3;
                this.objectB[i].Q1P2insumo4 = element[0].Q1P2insumo4;
                this.objectB[i].Q1P2insumo5 = element[0].Q1P2insumo5;
                this.objectB[i].Q1P2insumo6 = element[0].Q1P2insumo6;

                this.objectB[i].Q1P3insumo1 = element[0].Q1P3insumo1;
                this.objectB[i].Q1P3insumo2 = element[0].Q1P3insumo2;
                this.objectB[i].Q1P3insumo3 = element[0].Q1P3insumo3;
                this.objectB[i].Q1P3insumo4 = element[0].Q1P3insumo4;
                this.objectB[i].Q1P3insumo5 = element[0].Q1P3insumo5;
                this.objectB[i].Q1P3insumo6 = element[0].Q1P3insumo6;


                this.objectB[i].examen1 = element[0].examen1;

                this.objectB[i].Q2P1insumo1 = element[0].Q2P1insumo1;
                this.objectB[i].Q2P1insumo2 = element[0].Q2P1insumo2;
                this.objectB[i].Q2P1insumo3 = element[0].Q2P1insumo3;
                this.objectB[i].Q2P1insumo4 = element[0].Q2P1insumo4;
                this.objectB[i].Q2P1insumo5 = element[0].Q2P1insumo5;
                this.objectB[i].Q2P1insumo6 = element[0].Q2P1insumo6;

                this.objectB[i].Q2P2insumo1 = element[0].Q2P2insumo1;
                this.objectB[i].Q2P2insumo2 = element[0].Q2P2insumo2;
                this.objectB[i].Q2P2insumo3 = element[0].Q2P2insumo3;
                this.objectB[i].Q2P2insumo4 = element[0].Q2P2insumo4;
                this.objectB[i].Q2P2insumo5 = element[0].Q2P2insumo5;
                this.objectB[i].Q2P2insumo6 = element[0].Q2P2insumo6;

                this.objectB[i].Q2P3insumo1 = element[0].Q2P3insumo1;
                this.objectB[i].Q2P3insumo2 = element[0].Q2P3insumo2;
                this.objectB[i].Q2P3insumo3 = element[0].Q2P3insumo3;
                this.objectB[i].Q2P3insumo4 = element[0].Q2P3insumo4;
                this.objectB[i].Q2P3insumo5 = element[0].Q2P3insumo5;
                this.objectB[i].Q2P3insumo6 = element[0].Q2P3insumo6;

                this.objectB[i].examen2 = element[0].examen2;
                this.objectB[i].examenSupletorio = element[0].examenSupletorio;
                this.objectB[i].examenRemedial = element[0].examenRemedial;
                this.objectB[i].examenGracia = element[0].examenGracia;

                this.calculosBInit(i);
                i++;

              }
            }
          });
        });



        this.loading = false;

      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );

  }

  registroNotas() {

    this.pruebaclick();
    if (this.banderAux == false) {


      this._notaService.registerNota(this.object).subscribe(
        response => {
          this.mensajecorrectomodals = response.message;
          console.log("satisfactoriamente");
          this.loading = false;
          document.getElementById("openModalCorrecto").click();
          this.btnFinalizar = true;
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage) {
            this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
            document.getElementById("openModalError").click();
            try {
              var body = JSON.parse(error._body);
              errorMessage = body.message;
            } catch {
              errorMessage = "No hay conexión intentelo más tarde";
              this.loading = false;
              document.getElementById("openModalError").click();
            }
            this.loading = false;
          }
        }
      );
    }
  }



  registroNotasB() {

    this.pruebaclick();
    if (this.banderAux == false) {


      this._notaService.registerNotaB(this.objectB).subscribe(
        response => {
          this.mensajecorrectomodals = response.message;
          console.log("satisfactoriamente");
          this.loading = false;
        document.getElementById("openModalCorrecto").click();
          this.btnFinalizar2 = true;
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage) {
            this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
            document.getElementById("openModalError").click();
            try {
              var body = JSON.parse(error._body);
              errorMessage = body.message;
            } catch {
              errorMessage = "No hay conexión intentelo más tarde";
              this.loading = false;
              document.getElementById("openModalError").click();
            }
            this.loading = false;
          }
        }
      );
    }
  }

  logout() {
    this._docenteService.logout();
    location.reload(true);
  }

}
