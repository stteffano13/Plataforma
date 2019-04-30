import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {


  constructor(private _materiaService: MateriaService, private _administradorService: AdministradorService, private _matriculaServices: MatriculaService) { }


  public loading;
  public periodoLectivoActual;
  public listadoEstudianteMatriculas;
  public vectorListadoMisMaterias;
  // vectores


  ngOnInit() {
    this.getListadoMisMaterias();
    this.getPeriodoActual();
   


  }

  pruebaclick()
  {
    for(let i=0; i< 2; i++){
    document.getElementById("tdbuttonGuardar"+i).click();
  }
  }
  prueba(value) {
    console.log("prueba", value);
    var hola= document.getElementById("param1").textContent;
    console.log("falta en el hola",hola);
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
}
