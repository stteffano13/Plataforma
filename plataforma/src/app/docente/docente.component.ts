import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';
import { NotaService } from '../services/nota.services';
import { Nota } from '../models/nota';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {


  constructor(private _materiaService: MateriaService,
     private _administradorService: AdministradorService, 
     private _matriculaServices: MatriculaService,
     private _notaService:NotaService) { }


  public loading;
  public periodoLectivoActual;
  public listadoEstudianteMatriculas;
  public listadoEstudianteNotas;


  public vectorListadoMisMaterias;
  public obj: Nota;
  public mensajecorrectomodals;
  public mensajeerrormodals;

  // vectores

  
  public object = [];

  ngOnInit() {
    this.getListadoMisMaterias();
    this.getPeriodoActual();
   
  }

  pruebaclick() {
    for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {
      document.getElementById("tdbuttonGuardar" + i).click();
      console.log(this.object);
    }
  }


  prueba(value, i) {
    console.log("antes de mandar la materia index  es",i)
    this.object[i].estudiante=value.estudiante._id;
    this.object[i].materia=this.vectorListadoMisMaterias[0]._id;
    this.object[i].periodo=this.periodoLectivoActual;

  }

  getListadoMisMaterias() {

    this.vectorListadoMisMaterias = [];
    this._materiaService.getListadoMioMateria().subscribe(response => {

      console.log("esto iene de la peticion materias docente" + JSON.stringify(response));
      if (response.materias[0] != undefined) {
        this.vectorListadoMisMaterias = response.materias;
        console.log("materias del docente", this.vectorListadoMisMaterias);
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
    this.object=[];
    console.log("imprimiendo objeto",   value);
    this.loading = true;
    this._matriculaServices.buscarEstudianteMatricula(value).subscribe(
      response => {
      

        this.listadoEstudianteMatriculas = response.matriculas;
        console.log("satisfactoriamente vector notas", Object.keys(this.listadoEstudianteMatriculas).length);
        for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {

          this.object.push(this.obj = new Nota("","","","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
          console.log("me cree soy");
          
        }
        
        var objBuscarNotas={

          materia :this.vectorListadoMisMaterias[0]._id,
          buscar :  this.listadoEstudianteMatriculas

        }


        
     
        this.traerNotas(objBuscarNotas);

        this.loading = false;

        // console.log(this.listadoChoferes);
        this.loading = false;
      },
      error => {
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
    this.loading = true;
    this._notaService.buscarNotas(value).subscribe(
      response => {
       this.listadoEstudianteNotas=response.vectorNotas;
       console.log("porfin regresao las notas", this.listadoEstudianteNotas);
       let i=0;
       this.listadoEstudianteNotas.forEach(element => {
         console.log("elemnto",element);
        this.object[i].insumo1=element[0].insumo1;
        this.object[i].insumo2=element[0].insumo2;
        this.object[i].insumo3=element[0].insumo3;
        this.object[i].insumo4=element[0].insumo4;
        this.object[i].insumo5=element[0].insumo5;
        this.object[i].insumo6=element[0].insumo6;
        this.object[i].insumo7=element[0].insumo7;
        this.object[i].insumo8=element[0].insumo8;
        this.object[i].examen1=element[0].examen1;

        this.object[i].insumo11=element[0].insumo11;
        this.object[i].insumo22=element[0].insumo22;
        this.object[i].insumo33=element[0].insumo33;
        this.object[i].insumo44=element[0].insumo44;
        this.object[i].insumo55=element[0].insumo55;
        this.object[i].insumo66=element[0].insumo66;
        this.object[i].insumo77=element[0].insumo77;
        this.object[i].insumo88=element[0].insumo88;

        this.object[i].examen2=element[0].examen2;
        this.object[i].examenSupletorio=element[0].examenSupletorio;
        this.object[i].examenRemedial=element[0].examenRemedial;
        this.object[i].examenGracia=element[0].examenGracia;

        i++;
       });
       
        this.loading = false;

      },
      error => {
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

  registroNotas()
  {
    console.log("veamos si hay examen 2",this.object);
    this._notaService.registerNota(this.object).subscribe(
      response => {
        this.mensajecorrectomodals = response.message;
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        // this.limpiar(1);
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
