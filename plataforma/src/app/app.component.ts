import { Component, OnInit } from '@angular/core';
import { AdministradorService } from "../app/services/administrador.services";
import { DocenteService } from "../app/services/docente.services";
import { EstudianteService } from "../app/services/estudiante.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'plataforma';

  rootPage: any;


  public token;
  public identityAdmin;
  public identityEstudiante;
  public identityDocente;
  public bander = true;
  constructor(private _adminService: AdministradorService, private _docenteService: DocenteService, private _estudianteService:EstudianteService) {



  }

  ngOnInit() {


    this.identityDocente = this._docenteService.getIdentity();
    this.token = this._docenteService.getToken();

    this.identityAdmin = this._adminService.getIdentity();
    this.token = this._adminService.getToken();

    this.identityEstudiante = this._estudianteService.getIdentity();
    this.token = this._estudianteService.getToken();

    

    if (this.identityAdmin || this.identityDocente || this.identityEstudiante) {
      this.bander = false;
    }



    console.log("las vaibles del Storage");
    console.log(this.identityAdmin + this.token);


  }


}

