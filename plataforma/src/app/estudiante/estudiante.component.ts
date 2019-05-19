import { Component, OnInit } from '@angular/core';

import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';
import { EstudianteService } from '../services/estudiante.services';
import { NotaService } from '../services/nota.services';
import { Nota } from '../models/nota';
import { NotaBasica } from '../models/notaBasica';
import { Calculable } from '../models/calculable';
import { isNumber } from 'util';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
// banderas tablas
public banderTabla1= false;
public banderTabla2 = false;

  public loading;
  public periodoLectivoActual;
  public vectorListadoMisMaterias;
  public listadoNotas;
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
  constructor(private _materiaService: MateriaService,
    private _administradorService: AdministradorService,
    private _matriculaServices: MatriculaService,
    private _notaService: NotaService, private _estudianteServices: EstudianteService) { }

  ngOnInit() {
    this.getListadoMisMaterias();
    this.getPeriodoActual();

    this.identity = this._estudianteServices.getIdentity()
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

  getListadoMisMaterias() {

    this.vectorListadoMisMaterias = [];
    this._matriculaServices.getListadoMioMateria().subscribe(response => {

      if (response.materias[0] != undefined) {
        this.vectorListadoMisMaterias = response.materias;
        console.log("las amterias", this.vectorListadoMisMaterias);
        if (this.vectorListadoMisMaterias[0].curso.curso != "BÁSICO SUPERIOR INTENSIVO") {
          
        this.banderTabla1=true;

        for (let i = 0; i <= Object.keys(this.vectorListadoMisMaterias).length; i++) {

          this.object.push(this.obj = new Nota("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
          this.objectCalculable.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));
          console.log("estos son los seros del objeto", this.object);
        }
        this.traerNotas(this.periodoLectivoActual);
      }else
      {
        this.banderTabla1 = false;
          this.banderTabla2 = true;


          for (let i = 0; i < Object.keys(this.vectorListadoMisMaterias).length; i++) {

            this.objectB.push(this.objB = new NotaBasica("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
            this.objectCalculableB.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));

          }

          this.traerNotasB(this.periodoLectivoActual);
      }

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
   
  }


  traerNotas(periodo) {


    this._notaService.buscarNotasEstudiante(periodo).subscribe(
      response => {
        this.loading = false;
        this.listadoNotas = response.notas;


        console.log("listado notas", this.listadoNotas, "vector materias", this.vectorListadoMisMaterias);
        //  ordenar
        let i = 0;
        this.vectorListadoMisMaterias.forEach(elementE => {

          this.listadoNotas.forEach(element => {

            console.log("elementoE", elementE._id, "elemento", element.materia);
            if(elementE!=null && element!= null){
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



    }
  }


  
  traerNotasB(periodo) {


    this._notaService.buscarNotasEstudianteB(periodo).subscribe(
      response => {
        this.loading = false;
        this.listadoNotas = response.notas;


        console.log("listado notas", this.listadoNotas, "vector materias", this.vectorListadoMisMaterias);
        //  ordenar
        let i = 0;
        this.vectorListadoMisMaterias.forEach(elementE => {

          this.listadoNotas.forEach(element => {

            console.log("elementoE", elementE._id, "elemento", element.materia);
            if(elementE!=null && element!= null){
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
}
