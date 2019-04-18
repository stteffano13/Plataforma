import { Component, OnInit } from '@angular/core';
import { Docente } from "../models/docente";
import { Estudiante } from "../models/estudiante";
import { Curso } from "../models/curso";
import { Matricula } from "../models/matricula";
import { DocenteService } from "../services/docente.services";
import { CursoService } from '../services/curso.services';
import { EstudianteService } from '../services/estudiante.services';
import { MatriculaService } from '../services/matricula.services';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

import { AfterViewInit, ViewChild } from '@angular/core';





@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit, AfterViewInit {

  public url2;
  public hola1 = true;
  public mensajecorrectomodals;
  public mensajeerrormodals;
  public loading = false;
  public opcionPeriodoLectivo;
  public selectedEstudiante;
  public selectedCurso;
  public selectedDocente;
  public disabledMateriaImpartir = true;

  public arrayOctavo = [
    "Ciencias Sociales",
    "Informática",
    'Matemáticas',
    'Lenguaje y Comunicación',
    "Educación para la Ciudadanía"];

    public arrayNoveno = [
      "Ciencias Sociales",
      "Informática",
      'Matemáticas',
      'Lenguaje y Comunicación',
      "Educación para la Ciudadanía"];

  // objetos
  public docente_register: Docente;
  public estudiante_register: Estudiante;
  public curso_register: Curso;
  public matricula_register: Matricula;

  public textBox = true;
  public txtHide = true;
  public txtAparece = true;

  /* VALIDACION DE LOS CAMPOS DE LOS FORMULARIOS */
  // public cedulaVal = false;
  public vContrasenaSecre: String;
  public vContrasenaChofer: String;


  public textBoxContra = true;
  public textBoxContraC = true;

  public tipoUsuario = 'password';
  public tipoUsuarioM = 'password';
  public tipoUsuarioC = 'password';
  public tipoChofer = 'password';

  public clase_ojoUsuario = 'fa fa-eye fa-lg';
  public clase_ojoUsuarioM = 'fa fa-eye fa-lg';
  public clase_ojoUsuarioC = 'fa fa-eye fa-lg';
  public clase_ojoChofer = 'fa fa-eye fa-lg';

  public estadoClaveChofer;
  public estadoClaveUsuario;
  public contrasenaNew;
  public contrasenaNewUser;

  // banderas para aparecer los ingresos
  public IngresarDocente = false;
  public IngresarEstudiante = false;
  public IngresarParalelo = false;
  public IngresarMatricula = false;
  public IngresarAsignacion = false;

  // vectores

  public vectorListadoEstudiantes: any;
  public vectorListadoDocentes: any;
  public vectorListadoCursos: any;
  public vectorlistadoMaterias: any;


  constructor(private _docenteServices: DocenteService,
    private _cursoServices: CursoService,
    private _estudianteService: EstudianteService,
    private _matriculaServices: MatriculaService) {

    this.docente_register = new Docente("", "", "", "", "", "", "", "");
    this.estudiante_register = new Estudiante("", "", "", "", "", "", "", "");
    this.curso_register = new Curso("", "", "", "");
    this.matricula_register = new Matricula("", "", "", "", "");

  }

  myFunctionUsuario() {
    if (this.tipoUsuario === 'text') {
      this.tipoUsuario = 'password';
      this.clase_ojoUsuario = 'fa fa-eye fa-lg';
    } else {
      this.tipoUsuario = 'text';
      this.clase_ojoUsuario = 'fa fa-eye-slash fa-lg';
    }
  }
  habilitarContrasenaU() {

    if (this.tipoUsuarioM === 'text') {
      this.tipoUsuarioM = 'password';
      this.clase_ojoUsuarioM = 'fa fa-eye fa-lg';
      this.textBoxContra = true;
      this.estadoClaveUsuario = '0';
    } else {
      this.tipoUsuarioM = 'text';
      this.clase_ojoUsuarioM = 'fa fa-eye-slash fa-lg';
      this.textBoxContra = false;
      this.estadoClaveUsuario = '1';
    }
    console.log('estadoClaveContrasenaUsuario......', this.estadoClaveUsuario);
  }
  habilitarContrasenaC() {

    if (this.tipoUsuarioC === 'text') {
      this.tipoUsuarioC = 'password';
      this.clase_ojoUsuarioC = 'fa fa-eye fa-lg';
      this.textBoxContraC = true;
      this.estadoClaveChofer = '0';
    } else {
      this.tipoUsuarioC = 'text';
      this.clase_ojoUsuarioC = 'fa fa-eye-slash fa-lg';
      this.textBoxContraC = false;
      this.estadoClaveChofer = '1';
    }
    console.log('estadoClaveContrasenaChofer......', this.estadoClaveChofer);
  }
  myFunctionChofer() {
    if (this.tipoChofer === 'text') {
      this.tipoChofer = 'password';
      this.clase_ojoChofer = 'fa fa-eye fa-lg';
    } else {
      this.tipoChofer = 'text';
      this.clase_ojoChofer = 'fa fa-eye-slash fa-lg';
    }
  }

  habilitar() {
    this.textBox = !this.textBox;
    this.txtHide = true;
    this.txtAparece = false;
  }

  deshabilitar() {
    this.textBox = !this.textBox;
    this.txtHide = !this.txtHide;
    this.txtAparece = !this.txtAparece;
  }

  public aparecerNuevaMatricula() {
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = true;
    //this.url2 = '../../assets/imgs/IngresarMatricula.png';
  }
  public apareceIngreseDocente() {
    this.IngresarDocente = true;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    // this.url2 = '../../assets/imgs/IngresarDocente.png';
  }

  public apareceIngreseEstudiante() {
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = true;
    // this.url2 = '../../assets/imgs/IngresarEstudiante.png';
  }


  public aparecerAsignar() {
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = true;


  }
  ngOnInit() {
    this.url2 = '../../assets/imgs/IngresarDocente.png';
    this.opcionPeriodoLectivo = "Seleccione Periodo Lectivo, Periodo Actual:" + localStorage.getItem("periodoAnoLectivo");
    if (this.opcionPeriodoLectivo == null) {
      this.opcionPeriodoLectivo = "NO Asignado"
    }
    this.getListadoEstudiantes();
    this.getListadoCursos();
    this.getListadoDocentes();
  }

  ngAfterViewInit() {

  }


  asignarPeriodoLectivo(periodo) {

    localStorage.setItem("periodoAnoLectivo", periodo);

  }

  asignarCurso(curso) {
    this.curso_register.curso = curso;
  }




  onRegisterCurso() {
    this.loading = true;
    this.curso_register.estado = '0';



    console.log("Esta es el el curso que esta cogiendo", this.curso_register.curso);
    this._cursoServices.registerCurso(this.curso_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Curso se han registrado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        this.getListadoCursos();
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

  onRegisterDocente() {
    this.loading = true;
    this.docente_register.estado = '0';
    this._docenteServices.registerDocente(this.docente_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Docente se han registrado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        this.limpiar(1);
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

  onRegisterEstudiante() {
    this.loading = true;
    this.estudiante_register.estado = '0';
    this._estudianteService.registerEstudiante(this.estudiante_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Estudiante se han registrado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        this.getListadoEstudiantes();
        document.getElementById("openModalCorrecto").click();
        this.limpiar(2);
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


  public onRegisterMatricula() {
    let partsE: String[] = new Array();
    partsE = this.selectedEstudiante.split(".");
    console.log("Vamos mijin", partsE[0]);

    let partsC: String[] = new Array();
    partsC = this.selectedCurso.split(".");
    console.log("Vamos mijin", partsC[0]);



    this.loading = true;
    this.matricula_register.estado = '0';
    this.matricula_register.codigoE = partsE[0];
    this.matricula_register.codigoC = partsC[0];
    this.matricula_register.periodo = localStorage.getItem("periodoAnoLectivo");



    console.log("Esta es el el curso que esta cogiendo", this.curso_register.curso);
    this._matriculaServices.registerMatricula(this.matricula_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Loa matrícula se ha generado exitosamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        this.getListadoCursos();
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

  getListadoEstudiantes() {

    this._estudianteService.getListadoEstudiantes().subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.listadoEstudiantes[0] != undefined) {
        this.vectorListadoEstudiantes = response.listadoEstudiantes;
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getListadoCursos() {

    this._cursoServices.getListadoCursos().subscribe(response => {

      console.log("esto iene de la peticion Cursos" + JSON.stringify(response));
      if (response.listadoCursos[0] != undefined) {
        this.vectorListadoCursos = response.listadoCursos;
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getListadoDocentes() {

    this._docenteServices.getListadoDocentes().subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.listadoDocentes[0] != undefined) {
        this.vectorListadoDocentes = response.listadoDocentes;
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  limpiar(valor) {
    if (valor == '1') {
      this.hola1 = true;
      this.docente_register = new Docente("", "", "", "", "", "", "", "");
    }
    if (valor == '2') {
      this.estudiante_register = new Estudiante("", "", "", "", "", "", "", "");
      // this.url2 = "'../../assets/imgs/IngresarEstudiante.png'";
    }

    if (valor == '3') {
      /* this.taxi_register = new Taxi("", "", "", "", "", "", "", "", "");
       this.url2 = "../assets/img/IngresarAuto.png";*/
    }
  }

  public getRecDet(value) {

    console.log("Vamos mijin", value);
  }

  selectedMateria(value) {
    console.log("value", value);
    let curso: String[] = new Array();
    curso = value.split(" ");
    this.disabledMateriaImpartir = false;

    if ( curso[1].indexOf("8VO")) {
      this.vectorlistadoMaterias = this.arrayOctavo;
     
    }else
    {
      if(curso[1].indexOf("9NO"))
      {

      }
    }

  }








}
