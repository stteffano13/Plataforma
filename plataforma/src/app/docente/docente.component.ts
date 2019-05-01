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
    console.log("antes de mandar la materia es",this.vectorListadoMisMaterias)
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
    console.log("value curso", value);
    this.loading = true;
    this._matriculaServices.buscarEstudianteMatricula(value).subscribe(
      response => {
        console.log("satisfactoriamente matriculas", response.matriculas);

        this.listadoEstudianteMatriculas = response.matriculas;
        for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {

          this.object.push(this.obj = new Nota("","","","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
    
        }

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

  registroNotas()
  {
    this._notaService.registerNota(this.object).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Curso se han registrado satisfactoriamente.";
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
