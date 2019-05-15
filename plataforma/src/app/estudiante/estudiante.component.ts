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


  public periodoLectivoActual;
  public vectorListadoMisMaterias;

  public Titulo;
  public identity;
  public object = [];
  public obj : Nota;
 public  objectCalculable;
 public objC : Calculable;

  constructor(private _materiaService: MateriaService,
    private _administradorService: AdministradorService,
    private _matriculaServices: MatriculaService,
    private _notaService: NotaService, private _estudianteServices: EstudianteService) { }

  ngOnInit() {

    this.getPeriodoActual();
    this.getListadoMisMaterias();


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


        for (let i = 0; i < Object.keys(this.vectorListadoMisMaterias).length; i++) {

          this.object.push(this.obj = new Nota("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
         this.objectCalculable.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));

        }

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

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
