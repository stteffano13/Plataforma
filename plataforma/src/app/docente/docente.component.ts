import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.services';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  public  vectorListadoMisMaterias;
  constructor(private _materiaService:MateriaService) { }

  ngOnInit() {
    this.getListadoMisMaterias();
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
}
