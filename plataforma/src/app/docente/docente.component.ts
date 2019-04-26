import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.services';
import { AdministradorService } from '../services/administrador.services';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  public  vectorListadoMisMaterias;
  constructor(private _materiaService:MateriaService, private _administradorService: AdministradorService) { }

public periodoLectivoActual;

  ngOnInit() {
    this.getListadoMisMaterias();
    this. getPeriodoActual();
  }


  getListadoMisMaterias() {
    
    this.vectorListadoMisMaterias = [];
    this._materiaService.getListadoMioMateria().subscribe(response => {

      console.log("esto iene de la peticion materias docente" + JSON.stringify(response));
      if (response.listadoCursos[0] != undefined) {
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
}
