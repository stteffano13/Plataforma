import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';

import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';
import { EstudianteService } from '../services/estudiante.services';
import { NotaService } from '../services/nota.services';
import { Nota } from '../models/nota';
import { NotaBasica } from '../models/notaBasica';
import { Calculable } from '../models/calculable';
import { InsumoService } from '../services/insumo.services';
import { isNumber } from 'util';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit, DoCheck {

  @ViewChild('content') content: ElementRef;
  // banderas tablas
  public banderTabla1 = false;
  public banderTabla2 = false;

  public loading;
  public periodoLectivoActual;
  public vectorListadoMisMaterias;
  public listadoNotas: any;
  public Titulo;
  public identity;

  public obj: Nota;
  public objC: Calculable;
  public objectCalculable = [];
  public object = [];

  public objB: NotaBasica;
  public objCB: Calculable;
  public objectB = [];
  public objectCalculableB = [];

  public mensajeerrormodal;


  public caso;
  public banderInsumo = false;
  public banderInsumoB = false;
  public guardarMateriaMatricula;
  public listadoInsumos;
  public listadoInsumosB;
  public recivir;
  public counter = 5;

  // subscribes variables
  public subscribe1;
  public subscribe2;
  public subscribe3;
  public subscribe4;
  public subscribe5;
  public subscribe6;
 

  constructor(private _materiaService: MateriaService,
    private _administradorService: AdministradorService,
    private _matriculaServices: MatriculaService,
    private _notaService: NotaService, private _estudianteServices: EstudianteService, private _insumoService: InsumoService

  ) { }

  ngOnInit() {

    this.loading = true;
    this.getListadoMisMaterias();
    this.getPeriodoActual();
   

    this.identity = this._estudianteServices.getIdentity();
  }

  ngDoCheck() {
    if(this.banderTabla1)
    document.getElementById("btnTraerNotas").click();
    if(this.banderTabla2)
    document.getElementById("btnTraerNotasB").click();
  }

  ngOnDestroy()
  {
    console.log("chao");
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
    this.subscribe3.unsubscribe();
    this.subscribe4.unsubscribe();
    this.subscribe5.unsubscribe();
    this.subscribe6.unsubscribe();
    delete this.object;
    delete this.obj;
    delete this.objectCalculable;
    delete this.objC;
    delete this.objectB; 
    delete this.objB;
    delete this.objectCalculableB;
   
    
  }
  getPeriodoActual() {

    this.subscribe1=this._administradorService.getPeriodoActual().subscribe(response => {
      console.log("este es el periodo que vino", response.periodo)
      if (response.periodo != undefined) {
        this.periodoLectivoActual = response.periodo[0].periodo;


      }
    }, (err) => { this.loading=false; console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getListadoMisMaterias() {

    this.loading = true;
    this.vectorListadoMisMaterias = [];
    this.subscribe2= this._matriculaServices.getListadoMioMateria().subscribe(response => {

      if (response.materias[0] != undefined) {
        this.vectorListadoMisMaterias = response.materias;
        console.log("las amterias", this.vectorListadoMisMaterias);
        if (this.vectorListadoMisMaterias[0].curso.curso != "BÁSICO SUPERIOR INTENSIVO") {

          this.banderTabla1 = true;

          for (let i = 0; i <= Object.keys(this.vectorListadoMisMaterias).length; i++) {

            this.object.push(this.obj = new Nota("", "", "", "","0","0","0","0","0","0","0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
            this.objectCalculable.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));
            console.log("estos son los seros del objeto", this.object);
          }
        

         // this.traerNotas();
          //  this.traerNotas(this.periodoLectivoActual);
        } else {
          this.banderTabla1 = false;
          this.banderTabla2 = true;


          for (let i = 0; i < Object.keys(this.vectorListadoMisMaterias).length; i++) {

            this.objectB.push(this.objB = new NotaBasica("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0" ,"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
            this.objectCalculableB.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));

          }

         // this.traerNotasB(this.periodoLectivoActual);
        }

      }
    }, (err) => {  this.loading=false;  console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }


  traerNotas() {
    var periodo = this.periodoLectivoActual;
    this.subscribe3=this._notaService.buscarNotasEstudiante(periodo).subscribe(
      response => {

        this.listadoNotas = response.notas;

        
        console.log("listado notas", this.listadoNotas, "vector materias", this.vectorListadoMisMaterias);
        //  ordenar
        let i = 0;
        this.vectorListadoMisMaterias.forEach(elementE => {

          this.listadoNotas.forEach(element => {

            console.log("elementoE", elementE._id, "elemento", element.materia);
            if ((elementE != 0 && element != 0) && (elementE != null && element != null)) {
              if (elementE._id == element.materia) {
                this.object[i].insumo1 = element.insumo1;
                this.object[i].insumo2 = element.insumo2;
                this.object[i].insumo3 = element.insumo3;
                this.object[i].insumo4 = element.insumo4;
                this.object[i].insumo5 = element.insumo5;
                this.object[i].insumo6 = element.insumo6;
                this.object[i].insumo7 = element.insumo7;
                this.object[i].insumo8 = element.insumo8;
                this.object[i].examen1 = element.examen1;

                this.object[i].insumo11 = element.insumo11;
                this.object[i].insumo22 = element.insumo22;
                this.object[i].insumo33 = element.insumo33;
                this.object[i].insumo44 = element.insumo44;
                this.object[i].insumo55 = element.insumo55;
                this.object[i].insumo66 = element.insumo66;
                this.object[i].insumo77 = element.insumo77;
                this.object[i].insumo88 = element.insumo88;

                this.object[i].examen2 = element.examen2;
                this.object[i].examenSupletorio = element.examenSupletorio;
                this.object[i].examenRemedial = element.examenRemedial;
                this.object[i].examenGracia = element.examenGracia;

                this.calculosInit(i);
                i++;

              }
            }else
            {
              
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

  calculosInit(i) {
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


      if (this.object[i].examenSupletorio >= 7) {
        this.objectCalculable[i].promedioPeriodo = 7;

      }


      if (this.object[i].examenRemedial >= 7) {
        this.objectCalculable[i].promedioPeriodo = 7;

      }


      if (this.object[i].examenGracia >= 7) {
        this.objectCalculable[i].promedioPeriodo = 7;

      }


    }
  }



  traerNotasB() {
 var periodo = this.periodoLectivoActual;

 this.subscribe4=this._notaService.buscarNotasEstudianteB(periodo).subscribe(
      response => {
        this.loading = false;
        this.listadoNotas = response.notas;


        console.log("listado notas", this.listadoNotas, "vector materias", this.vectorListadoMisMaterias);
        //  ordenar
        let i = 0;
        this.vectorListadoMisMaterias.forEach(elementE => {

          this.listadoNotas.forEach(element => {

            console.log("elementoE", elementE._id, "elemento", element.materia);
            if (elementE != null && element != null) {
              if (elementE._id == element.materia) {
                this.objectB[i].Q1P1insumo1 = element.Q1P1insumo1;
                this.objectB[i].Q1P1insumo2 = element.Q1P1insumo2;
                this.objectB[i].Q1P1insumo3 = element.Q1P1insumo3;
                this.objectB[i].Q1P1insumo4 = element.Q1P1insumo4;
                this.objectB[i].Q1P1insumo5 = element.Q1P1insumo5;
                this.objectB[i].Q1P1insumo6 = element.Q1P1insumo6;

                this.objectB[i].Q1P2insumo1 = element.Q1P2insumo1;
                this.objectB[i].Q1P2insumo2 = element.Q1P2insumo2;
                this.objectB[i].Q1P2insumo3 = element.Q1P2insumo3;
                this.objectB[i].Q1P2insumo4 = element.Q1P2insumo4;
                this.objectB[i].Q1P2insumo5 = element.Q1P2insumo5;
                this.objectB[i].Q1P2insumo6 = element.Q1P2insumo6;

                this.objectB[i].Q1P3insumo1 = element.Q1P3insumo1;
                this.objectB[i].Q1P3insumo2 = element.Q1P3insumo2;
                this.objectB[i].Q1P3insumo3 = element.Q1P3insumo3;
                this.objectB[i].Q1P3insumo4 = element.Q1P3insumo4;
                this.objectB[i].Q1P3insumo5 = element.Q1P3insumo5;
                this.objectB[i].Q1P3insumo6 = element.Q1P3insumo6;


                this.objectB[i].examen1 = element.examen1;

                this.objectB[i].Q2P1insumo1 = element.Q2P1insumo1;
                this.objectB[i].Q2P1insumo2 = element.Q2P1insumo2;
                this.objectB[i].Q2P1insumo3 = element.Q2P1insumo3;
                this.objectB[i].Q2P1insumo4 = element.Q2P1insumo4;
                this.objectB[i].Q2P1insumo5 = element.Q2P1insumo5;
                this.objectB[i].Q2P1insumo6 = element.Q2P1insumo6;

                this.objectB[i].Q2P2insumo1 = element.Q2P2insumo1;
                this.objectB[i].Q2P2insumo2 = element.Q2P2insumo2;
                this.objectB[i].Q2P2insumo3 = element.Q2P2insumo3;
                this.objectB[i].Q2P2insumo4 = element.Q2P2insumo4;
                this.objectB[i].Q2P2insumo5 = element.Q2P2insumo5;
                this.objectB[i].Q2P2insumo6 = element.Q2P2insumo6;

                this.objectB[i].Q2P3insumo1 = element.Q2P3insumo1;
                this.objectB[i].Q2P3insumo2 = element.Q2P3insumo2;
                this.objectB[i].Q2P3insumo3 = element.Q2P3insumo3;
                this.objectB[i].Q2P3insumo4 = element.Q2P3insumo4;
                this.objectB[i].Q2P3insumo5 = element.Q2P3insumo5;
                this.objectB[i].Q2P3insumo6 = element.Q2P3insumo6;

                this.objectB[i].examen2 = element.examen2;
                this.objectB[i].examenSupletorio = element.examenSupletorio;
                this.objectB[i].examenRemedial = element.examenRemedial;
                this.objectB[i].examenGracia = element.examenGracia;

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

      if (this.objectB[i].examenSupletorio >= 7) {
        this.objectCalculableB[i].promedioPeriodo = 7;

      }


      if (this.objectB[i].examenRemedial >= 7) {
        this.objectCalculableB[i].promedioPeriodo = 7;

      }


      if (this.objectB[i].examenGracia >= 7) {
        this.objectCalculableB[i].promedioPeriodo = 7;

      }

    }
  }


  asignarMateriaCurso(value) {
    var busqueda = value.split(",");
    this.Titulo = busqueda[3];

  }

  logout() {
    this._estudianteServices.logout();
    location.reload(true);
  }

  recargar() {
    location.reload();
  }


  actualizacionInsumos(insumo, materia) {
    this.listadoInsumos = "";
    this.banderInsumo = true;
    this.recivir = materia;

    var objDescInsumos =
    {
      materia: insumo,
      periodo: this.periodoLectivoActual
    }
    console.log("esto e sloq ue hay que buscar como estudainte", objDescInsumos);
    this.subscribe5= this._insumoService.getDescInsumos(objDescInsumos).subscribe(response => {

      if (response.insumos != undefined) {
        this.listadoInsumos = response.insumos;
        //this.recivir = this.listadoInsumos;

      }
    }, (err) => {  this.loading= false; console.log("Existen Complicaciones Intente mas tarde", err) }
    );





  }

  actualizacionInsumosB(insumo, materia) {
    this.listadoInsumosB = "";
    this.recivir = materia;
    this.banderInsumoB = true;


    var objDescInsumosB =
    {
      materia: insumo,
      periodo: this.periodoLectivoActual
    }

    this.subscribe6=this._insumoService.getDescInsumosB(objDescInsumosB).subscribe(response => {

      if (response.insumosB != undefined) {
        this.listadoInsumosB = response.insumosB;
        console.log("listado insumos de la basica", this.listadoInsumosB);


      }
    }, (err) => { this.loading=false;  console.log("Existen Complicaciones Intente mas tarde", err) }
    );




  }

  cerrarDescInsumos() {

    this.banderInsumo = false;
  }


  cerrarDescInsumosB() {

    this.banderInsumoB = false;
  }


  generarPdf() {

    this.loading = true;

    interface jsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }



    var logo = new Image();
    logo.src = '../../assets/imgs/logo.png';


    const doc = new jsPDF('l', 'px', 'a4') as jsPDFWithPlugin;

    doc.addImage(logo, 'PNG', 30, 15, 100, 80);
    doc.fromHTML("<h2>COLEGIO DE BACHILLERATO PCEI EBENEZER</h2>", 170, 2);
    doc.fromHTML("<h4>ACTA DE CALIFICACIÓN POR PERIODO" + "  " + this.periodoLectivoActual + "</h4>", 170, 28);
    doc.fromHTML("<h4>" + this.vectorListadoMisMaterias[0].curso.curso + " " + this.vectorListadoMisMaterias[0].curso.paralelo + "</h4>", 250, 48);
    doc.fromHTML("<h4>ESTUDIANTE: " + this.identity.apellido + "  " + this.identity.nombre + "</h4>", 200, 68);

    var cont = this.vectorListadoMisMaterias.length;

    if (this.banderTabla1) {

      doc.autoTable({ html: '#results', startY: 120 ,columnStyles: {9: {fillColor: [249, 247, 95]},
       11: {fillColor: [249, 247, 95]},
       12: {fillColor: [207, 233, 176]}, 21: {fillColor: [249, 247, 95]},  23: {fillColor: [249, 247, 95]},
       24: {fillColor: [207, 233, 176]}, 25: {fillColor: [191, 250, 119]} },
      styles: { overflow: 'linebreak',  fontSize: 6} });

    
      this.loading = false;

      doc.save('Reporte_Notas_Alumno.pdf');
  



    } else {
      doc.autoTable({
        html: '#results2', startY: 120,columnStyles: {19: {fillColor: [249, 247, 95]},
        21: {fillColor: [249, 247, 95]},
        22: {fillColor: [207, 233, 176]}, 41: {fillColor: [249, 247, 95]},  43: {fillColor: [249, 247, 95]},
        44: {fillColor: [207, 233, 176]}, 45: {fillColor: [191, 250, 119]} }, margin: {left: 30}, styles: {
         
          overflow: 'linebreak',
          fontSize: 5,
          //rowHeight: 0,
          cellWidth: 'auto',
          cellPadding: 3,
     
       // calculateWidths: 300

        }

      });
     
      this.loading = false;

      doc.save('Reporte_Notas_Alumno.pdf');
    }

/* html2canvas(document.getElementById('results2'), { scale: 5 }).then(function (canvas) {
        var img = canvas.toDataURL("image/png");
        var context = canvas.getContext("2d");
        context.scale(5, 5);
        context["imageSmoothingEnabled"] = false;
        context["mozImageSmoothingEnabled"] = false
        context["oImageSmoothingEnabled"] = false
        context["webkitImageSmoothingEnabled"] = false
        context["msImageSmoothingEnabled"] = false

        // var doc = new jsPDF('l', 'mm');
        doc.addImage(img, 'JPEG', 18, 130, 580, 40 * cont);
        doc.save('Reporte_Notas_Alumno.pdf');
      });
      let intervalId = setInterval(() => {
        this.counter = this.counter - 1;

        console.log(this.counter)
        if (this.counter === 0) { clearInterval(intervalId); this.loading = false; }
      }, 1000)
*/
    /*  var j = 0;
      for (var i = 1; i <= 2; i++) {
        doc.fromHTML( "<tr>   <td>" + this.vectorListadoMisMaterias[j].nombre + "</td> </tr><tr> <td>Celda 6</td>  </tr>  <tbody> </table>", 15,
      100 * i,
      {
        width:100,
      });
    j++;
  }*/
    /* doc.autoTable({
        head: [['Name', 'Email', 'Country']],
        body: [
       for(var h=0; h<=2; h++){
          [this.vectorListadoMisMaterias[0].nombre, 'david@example.com', 'Sweden'],
       }
        ]
      });*/

    //doc.autoTable({html :  '#results' });






    /*  var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };*/

    // var source = window.document.getElementsByTagName("body")[0];



    //  doc.save("prueba");



  }
  apagar() {
    this.loading = false;
  }
}