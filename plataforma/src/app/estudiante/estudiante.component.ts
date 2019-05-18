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

  public loading;
  public periodoLectivoActual;
  public vectorListadoMisMaterias;
  public listadoNotas;
  public Titulo;
  public identity;
  public object = [];
  public obj: Nota;
  public objectCalculable = [];
  public objC: Calculable;

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
        this.traerNotas(this.periodoLectivoActual);
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


        for (let i = 0; i <= Object.keys(this.vectorListadoMisMaterias).length; i++) {

          this.object.push(this.obj = new Nota("", "", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"));
          this.objectCalculable.push(this.objC = new Calculable("0", "0", "0", "0", "0", "0", "0"));
          console.log("estos son los seros del objeto", this.object);
        }


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
    console.log("estos son los seros del objeto", this.object);
  }


  traerNotas(periodo) {


    this._notaService.buscarNotasEstudiante(periodo).subscribe(
      response => {
        this.loading = false;
        this.listadoNotas = response.notas;

        
        console.log("listado notas",  this.listadoNotas, "vector materias",  this.vectorListadoMisMaterias);
        //  ordenar
        let i = 0;
        this.vectorListadoMisMaterias.forEach(elementE => {

          this.listadoNotas.forEach(element => {

            console.log("elementoE", elementE._id, "elemento", element.materia);

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

              //this.calculosInit(i);
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
