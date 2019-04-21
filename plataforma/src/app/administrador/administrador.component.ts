import { Component, OnInit } from '@angular/core';
import { Docente } from "../models/docente";
import { Estudiante } from "../models/estudiante";
import { Curso } from "../models/curso";
import { Matricula } from "../models/matricula";
import { Materia } from "../models/materia";
import { DocenteService } from "../services/docente.services";
import { CursoService } from '../services/curso.services';
import { EstudianteService } from '../services/estudiante.services';
import { MatriculaService } from '../services/matricula.services';
import { MateriaService } from '../services/materia.services';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

import { AfterViewInit, ViewChild } from '@angular/core';





@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit, AfterViewInit {
 public  txtvalidacionModificarDocente = true;
 public  txtvalidacionOjoModificarDocente = true;

 public  txtvalidacionModificarEstudiante = true;
 public  txtvalidacionOjoModificarEstudiante = true;


  public url2;
  public hola1 = true;
  public mensajecorrectomodals;
  public mensajeerrormodals;
  public loading = false;
  public opcionPeriodoLectivo;
  public selectedEstudiante;
  public selectedCurso;
  public selectedDocente;

  public selectedDocenteAsignacion;
  public selectedCursoAsignacion;
  public selectedMateriaAsignacion;

  public disabledMateriaImpartir = true;
  public imagen = true;

  // busqueda matricula
  public buscarMatriculaPeriodo;
  public busquedaMatricula;


  // busqueda asignacion
  public buscarCursoAsignacion;
  public busquedaDocenteAsignacion;
  public busquedaAsignacionPeriodo;


// banderas para busquedas individuales eliminar matricula y asignacion
  public buscar;
  public listadoD = true;
  public listadoE = true;
  public listadoA = true;
  public listados = false;

  public listadosMostrarMatriculas = false;
  public listadosMostrarAsignacion = false;
  public listadoM = true;


  //listados
  public listadoEstudiantes;
  public listadoDocentes;
  public listadoMatriculas;
  public listadoMaterias;
  public listadoMatriculasNueva = [];
  public listadoAsignacionNueva = [];

  // objetos de carga
  public datosDocentes;
  public datosEstudiantes;

  // vectores de materias

  public arrayOctavo = [
    "Ciencias Sociales",
    "Informática",
    'Matemáticas',
    'Lenguaje y Comunicación',
    "Educación para la Ciudadanía"];

  public arrayNoveno = [
    " Ciencias Sociales",
    "Ciencias Naturales",
    "Informática",
    "Matemáticas",
    "Lenguaje y Comunicación",
    "Educación para la Ciudadanía"
  ];

  public arrayDecimo = [
    "Ciencias Sociales",
    "Ciencias Naturales",
    "Informática",
    "Matemáticas",
    "Lenguaje y Comunicación",
    "Educación para la Ciudadanía",

  ];

  public array1Bach = [
    "Fisica",
    "Quimica",
    "Educacion para la ciudadanía",
    "Ingles",
    "Biologia",
    "Lengua y Literatura",
    "Historia",
    "Emprendimiento y Gestion"
  ];


  public array2Bach = [
    "Fisica",
    "Quimica",
    "Educacion para la ciudadanía",
    "Ingles",
    "Biologia",
    "Lengua y Literatura",
    "Historia",
    "Emprendimiento y Gestion"

  ];

  public array3Bach = [
    "Fisica",
    "Quimica",
    "Educacion para la ciudadanía",
    "Ingles",
    "Biologia",
    "Lengua y Literatura",
    "Historia",
    "Emprendimiento y Gestion"

  ];

  // objetos
  public docente_register: Docente;
  public estudiante_register: Estudiante;
  public curso_register: Curso;
  public matricula_register: Matricula;
  public materia_register: Materia;

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

  public estadoClaveEstudiante;
  public estadoClaveDocente;

  public contrasenaUpdateEstudiante;
  public contrasenaUpdateDocente;




  // banderas para aparecer los ingresos
  public IngresarDocente = false;
  public IngresarEstudiante = false;
  public IngresarParalelo = false;
  public IngresarMatricula = false;
  public IngresarAsignacion = false;

  // banderas para aparecer los modificar

  public ModificarDocente = false;
  public ModificarEstudiante = false;

  // vectores

  public vectorListadoEstudiantes: any;
  public vectorListadoDocentes: any;
  public vectorListadoCursos: any;
  public vectorlistadoMaterias: any;


  constructor(private _docenteServices: DocenteService,
    private _cursoServices: CursoService,
    private _estudianteService: EstudianteService,
    private _matriculaServices: MatriculaService,
    private _materiaServices: MateriaService) {

    this.docente_register = new Docente("", "", "", "", "", "", "", "");
    this.estudiante_register = new Estudiante("", "", "", "", "", "", "", "");
    this.curso_register = new Curso("", "", "", "");
    this.matricula_register = new Matricula("", "", "", "", "");
    this.materia_register = new Materia("", "", "", "", "", "");

  }


  ngOnInit() {
    this.url2 = '../../assets/imgs/IngresarDocente.png';
    this.opcionPeriodoLectivo = "Seleccione Periodo Lectivo, Periodo Actual:" + localStorage.getItem("periodoAnoLectivo");
    this.opcionPeriodoLectivo = "no asignado"
    this.buscarMatriculaPeriodo = "no asignado";
    this.getListadoEstudiantes();
    this.getListadoCursos();
    this.getListadoDocentes();
    this.txtHide = false;
  


  }

  ngAfterViewInit() {

  }

  // busquedas
  public busqueda() {
    this.listados = true;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.busquedaDocente();
    this.busquedaEstudiantes();


  }

  busquedaDocente() {
    this.loading = true;
    this._docenteServices.buscarDocentes(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente", response.docentes);

        this.listadoDocentes = response.docentes;
        if (this.listadoDocentes == "") {
          this.listadoD = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoD = true;
        }
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


  busquedaEstudiantes() {
    this.loading = true;
    this._estudianteService.buscarEstudiantes(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente estudiantes", response.estudiantes);

        this.listadoEstudiantes = response.estudiantes;
        if (this.listadoDocentes == "") {
          this.listadoE = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoE = true;
        }
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

  busquedaMatriculas() {
    this.loading = true;
    this._matriculaServices.buscarMatriculas(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente matriculas", response.matriculas);

        this.listadoMatriculas = response.matriculas;
        if (this.listadoMatriculas == "") {
          this.listadoM = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoM = true;
        }
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


  busquedaAsignacion() {
    this.loading = true;
    this._materiaServices.buscarMaterias(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente materias", response.materias);

        this.listadoMaterias = response.materias;
        if (this.listadoMaterias == "") {
          this.listadoA = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoA = true;
        }
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


  busquedaMatricuaFiltrado() {


    this.listadoMatriculasNueva = [];
    this.listadoMatriculas.forEach(element => {
      let codigoE: String[] = new Array();
      codigoE = this.busquedaMatricula.split(".");
      console.log(element.estudiante.codigo);
      if (this.busquedaMatricula != null && this.buscarMatriculaPeriodo == "no asignado" && element.estudiante.codigo == codigoE[0]) {
        console.log("entraste a la busqueda MF1");
        this.listadoMatriculasNueva.push(element);

      } else {
        if (this.buscarMatriculaPeriodo != "no asignado" && this.busquedaMatricula == null && element.periodo == this.buscarMatriculaPeriodo) {
          console.log("entraste a la busqueda MF2");
          this.listadoMatriculasNueva.push(element);
        } else {
          if (this.buscarMatriculaPeriodo != "no asignado" &&
            this.busquedaMatricula != null &&
            element.periodo == this.buscarMatriculaPeriodo &&
            element.estudiante.codigo == codigoE[0]) {
            console.log("entraste a la busqueda MF3");
            this.listadoMatriculasNueva.push(element);
            console.log("entraste a la busqueda MF3 result", this.listadoMatriculasNueva);
          } else {

            console.log("no entre a nada");
          }
        }
      }
    });

  }

  buscarAsignacionPeriodo(value) {
    this.busquedaAsignacionPeriodo = value;
  }


  busquedaAsignacionFiltrado() {




    this.listadoAsignacionNueva = [];


    this.listadoMaterias.forEach(element => {
      console.log("mat");
      if (this.busquedaAsignacionPeriodo != "no asignado" && this.busquedaDocenteAsignacion != null) {

        let codigoD: String[] = new Array();
        codigoD = this.busquedaDocenteAsignacion.split(".");

        if ((element.periodo.indexOf(this.busquedaAsignacionPeriodo) != -1 && element.docente.codigo.indexOf(codigoD[0]) != -1)) {
          this.listadoAsignacionNueva.push(element);
          console.log("entraste a la busqueda de materias");
        } else {
          this.listadoAsignacionNueva = [];
        }
      } else {
        if (this.busquedaAsignacionPeriodo != "no asignado" && this.buscarCursoAsignacion != null) {

          let codigoC: String[] = new Array();
          codigoC = this.buscarCursoAsignacion.split(".");

          if ((element.periodo.indexOf(this.busquedaAsignacionPeriodo) != -1 && element.curso.codigo.indexOf(codigoC[0]) != -1)) {
            this.listadoAsignacionNueva.push(element);
            console.log("entraste a la busqueda de materias");
          } else {
            this.listadoAsignacionNueva = [];
          }

          this.listadoMatriculasNueva.push(element);
        } else {
          if (this.busquedaDocenteAsignacion != null && this.buscarCursoAsignacion != null) {
            console.log("entraste a la ultima  busqueda de materias");
            let codigoD: String[] = new Array();
            codigoD = this.busquedaDocenteAsignacion.split(".");
            let codigoC: String[] = new Array();
            codigoC = this.buscarCursoAsignacion.split(".");

            if (element.curso.codigo.indexOf(codigoC[0]) != -1 && element.docente.codigo.indexOf(codigoD[0]) != -1) {
              this.listadoAsignacionNueva.push(element);

            } else {
              this.listadoAsignacionNueva = [];
            }

            this.listadoMatriculasNueva.push(element);
          }
        }
      }
    });
  }

  // extras validacion
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
      this.estadoClaveDocente = '0';
      this.txtvalidacionOjoModificarDocente = false;
    } else {
      this.tipoUsuarioM = 'text';
      this.clase_ojoUsuarioM = 'fa fa-eye-slash fa-lg';
      this.textBoxContra = false;
      this.estadoClaveDocente = '1';
      this.txtvalidacionOjoModificarDocente = true;
    }
    console.log('estadoClaveContrasenaUsuario......', this.estadoClaveDocente);
  }
  habilitarContrasenaC() {

    if (this.tipoUsuarioC === 'text') {
      this.tipoUsuarioC = 'password';
      this.clase_ojoUsuarioC = 'fa fa-eye fa-lg';
      this.textBoxContraC = true;
      this.estadoClaveEstudiante = '0';
      this.txtvalidacionOjoModificarEstudiante = false;
    } else {
      this.tipoUsuarioC = 'text';
      this.clase_ojoUsuarioC = 'fa fa-eye-slash fa-lg';
      this.textBoxContraC = false;
      this.estadoClaveEstudiante = '1';
      this.txtvalidacionOjoModificarEstudiante = true;
    }
    console.log('estadoClaveContrasenaChofer......', this.estadoClaveEstudiante);
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
    this.txtvalidacionModificarDocente = true;
    this.txtvalidacionModificarEstudiante = true;
  }

  deshabilitar() {
    this.textBox = !this.textBox;
    this.txtHide = !this.txtHide;
    this.txtAparece = !this.txtAparece;
    this.txtvalidacionModificarDocente = false;
    this.txtvalidacionModificarEstudiante = false;
  }

  // modulos
  aparecerEliminarAsignar() {
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = true;
    this.busquedaAsignacionPeriodo = "no asignar"
    this.busquedaAsignacion();
    this.ModificarDocente=false;
  }

  aparecerEliminarMatricula() {
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = true;
    this.listadosMostrarAsignacion = false;
    this.getListadoEstudiantes();
    this.busquedaMatriculas();
    this.ModificarDocente=false;

    // this.url2 = '../../assets/imgs/IngresarMatricula.png';
  }


  aparecerNuevaMatricula() {
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = true;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente=true;
    this.url2 = '../../assets/imgs/IngresarMatricula.png';
    this.ModificarDocente=false;
  }
  apareceIngreseDocente() {
    this.IngresarDocente = true;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente=true;
    this.url2 = '../../assets/imgs/IngresarDocente.png';
    this.ModificarDocente=false;
  }

  apareceIngreseEstudiante() {
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarAsignacion = false;
    this.IngresarEstudiante = true;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;

    this.url2 = '../../assets/imgs/IngresarEstudiante.png';
    this.ModificarDocente=false;
  }
  

  aparecerAsignar() {
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = true;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente=false;


  }

  buscarMatriculas(value) {
    this.buscarMatriculaPeriodo = value;
  }

  // registros

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
        this.getListadoDocentes();
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
        this.getListadoEstudiantes();
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


  onRegisterMatricula() {
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

  onRegisterAsignacion() {
    let partsD: String[] = new Array();
    partsD = this.selectedDocenteAsignacion.split(".");
    console.log("Vamos mijin", partsD[0]);

    let partsC: String[] = new Array();
    partsC = this.selectedCursoAsignacion.split(".");
    console.log("Vamos mijin", partsC[0]);

    this.loading = true;
    this.materia_register.estado = '0';
    this.materia_register.codigoD = partsD[0];
    this.materia_register.codigoC = partsC[0];
    this.materia_register.periodo = localStorage.getItem("periodoAnoLectivo");

    this._materiaServices.registerMateria(this.materia_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Loa materia se ha generado exitosamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        this.busquedaAsignacion();
        document.getElementById("openModalCorrecto").click();
        // this.limpiar(1);
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          this.loading = false;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
            this.loading = false;
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


  // modificars

  aparecerUpdateDatosDocentes(datosDocente) {
    this.contrasenaUpdateDocente = "";
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente=true;
    this.datosDocentes = datosDocente;
    this.listados=false;

  }

  aparecerUpdateDatosEstudiante(datosEstudiante)
  {

    this.contrasenaUpdateDocente = "";
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente=false;
    this.ModificarEstudiante=true;
    this.datosEstudiantes = datosEstudiante;
    this.listados=false;
  }

  onUpdateDocentes(estado)
  {

    console.log('mi contra con ******>>>>', this.contrasenaUpdateDocente);
    this.datosDocentes.estado = estado;
    this.loading = true;

    if (this.contrasenaUpdateDocente != null || this.contrasenaUpdateDocente != '') {
      this.estadoClaveDocente = '1';
      console.log('estadoclaveusuario si es diferente null ""', this.estadoClaveDocente);
    }

    if (this.contrasenaUpdateDocente == null || this.contrasenaUpdateDocente == '') {
      this.estadoClaveDocente = '0';
      console.log('estadoclaveusuario 0000000 ""', this.estadoClaveDocente);
    }

    if (this.estadoClaveDocente == '1') {
      console.log('Estado clave usuario vane', this.contrasenaUpdateDocente);
      this.datosDocentes.contrasena = this.contrasenaUpdateDocente;
    }

    this._docenteServices.update_docente(this.datosDocentes, this.estadoClaveDocente).subscribe(
      response => {
        this.mensajecorrectomodals = "El Docente se ha eliminado correctamente"; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;

        if (estado == '0') {
          this.mensajecorrectomodals = "Los datos del Docente se han modificado satisfactoriamente.";
          document.getElementById("openModalCorrecto").click();
        } else {
          this.mensajecorrectomodals = "La cuenta del Docente  ha sido eliminada.";
          document.getElementById("openModalCorrecto").click();
        }
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
      }
    );
  }



  onUpdateEstudiante(estado)
  {

    console.log('mi contra con ******>>>>', this.contrasenaUpdateEstudiante);
    this.datosEstudiantes.estado = estado;
    this.loading = true;

    if (this.contrasenaUpdateEstudiante != null || this.contrasenaUpdateEstudiante != '') {
      this.estadoClaveEstudiante = '1';
      console.log('estadoclaveusuario si es diferente null ""', this.estadoClaveEstudiante);
    }

    if (this.contrasenaUpdateEstudiante == null || this.contrasenaUpdateEstudiante == '') {
      this.estadoClaveEstudiante = '0';
      console.log('estadoclaveusuario 0000000 ""', this.estadoClaveEstudiante);
    }

    if (this.estadoClaveEstudiante == '1') {
      console.log('Estado clave usuario vane', this.contrasenaUpdateEstudiante);
      this.datosDocentes.contrasena = this.contrasenaUpdateEstudiante;
    }

    this._docenteServices.update_docente(this.datosEstudiantes, this.estadoClaveEstudiante).subscribe(
      response => {
        this.mensajecorrectomodals = "El Docente se ha eliminado correctamente"; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;

        if (estado == '0') {
          this.mensajecorrectomodals = "Los datos del Docente se han modificado satisfactoriamente.";
          document.getElementById("openModalCorrecto").click();
        } else {
          this.mensajecorrectomodals = "La cuenta del Docente  ha sido eliminada.";
          document.getElementById("openModalCorrecto").click();
        }
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
      }
    );
  }

  // obtener lsitados a vectores
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


  getRecDet(value) {

    console.log("Vamos mijin", value);
  }

  selectedMateria(value) {
    console.log("value", value);
    let curso: String[] = new Array();
    curso = value.split(" ");
    this.disabledMateriaImpartir = false;
    console.log("value[1]", curso[1]);
    if (curso[1].indexOf("8VO") != -1) {
      this.vectorlistadoMaterias = this.arrayOctavo;
      console.log("entre 8");
    } else {
      if (curso[1].indexOf("9NO") != -1) {
        this.vectorlistadoMaterias = this.arrayNoveno;
        console.log("entre 9");
      } else {
        if (curso[1].indexOf("10MO") != -1) {
          this.vectorlistadoMaterias = this.arrayDecimo;
          console.log("entre 10");
        } else {
          if (curso[1].indexOf("1ER") != -1) {
            this.vectorlistadoMaterias = this.array1Bach;
            console.log("entre 1er");
          } else {
            if (curso[1].indexOf("2DO") != -1) {
              this.vectorlistadoMaterias = this.array2Bach;
            } else {
              if (curso[1].indexOf("3ER") != -1) {
                this.vectorlistadoMaterias = this.array3Bach;
              }
            }
          }
        }

      }


    }


  }


}
