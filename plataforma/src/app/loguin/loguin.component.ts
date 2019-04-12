import { Component } from '@angular/core';
import { AdministradorService } from "../services/administrador.services";
import { DocenteService } from "../services/docente.services";

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent  {

  constructor(private _adminServices: AdministradorService,private _docenteServices:  DocenteService) { }
  banderLoguin = "";
  public obj = {
    email: null,
    password: null
  };
  public identity;
  public token;
  public loading = false;
  public error = "";
 
  selectAdminsitrador() {
    this.banderLoguin = "administrador"
  }
  selectDocente() {
    this.banderLoguin = "docente"
  }
  selectestudiante() {
    this.banderLoguin = "estudiante"
  }

  public Loguin() {

    console.log(this.banderLoguin);
    switch (this.banderLoguin) {
      case "administrador":
      this.loading = true;
      this._adminServices.singupAdministrador(this.obj, "").subscribe(
        response => {
          this.loading = false;
          console.log(response + "esto viene en la respuesta");
          let identity = response.user;
          this.identity = identity;
          console.log(identity);
          if (!this.identity._id) {
            console.log("el usuario no se ha logueado correctamente");
  
            // aqui la alerta
          } else {
            // crear local storage
            localStorage.setItem("identityAdmin", JSON.stringify(identity));
  
            this._adminServices.singupAdministrador(this.obj, "true").subscribe(
              response => {
                let token = response.token;
                this.token = token;
                console.log(token)
                if (this.token.length <= 0) {
                  // aqui mensaje
                  console.log("el token nose ha generado");
                } else {
                  localStorage.setItem("Token", token);
                  location.reload(true);
                  //location.href = "www.appmontecarlotransvip.com:4200";
                }
              },
              error => {
                this.loading = false;
                var errorMessage = <any>error;
                if (errorMessage) {
                  try {
                    var body = JSON.parse(error._body);
                    errorMessage = body.message;
                  } catch{ errorMessage = "NO hay conexion intentelo Ms Tarde"; }
                  this.error = errorMessage;
                  console.log(this.error);
                }
              }
            );
            //fin
          }
        },
        error => {
          this.loading = false;
          var errorMessage = <any>error;
          if (errorMessage) {
            try {
              var body = JSON.parse(error._body);
              errorMessage = body.message;
            } catch{ errorMessage = "No hay conexión intentelo más tarde"; }
            this.error = errorMessage;
            console.log(this.error);
          }
        });
        break;

        // registro administrador

        case "docente":
      this.loading = true;
      this._docenteServices.singupDocente(this.obj, "").subscribe(
        response => {
          this.loading = false;
          console.log(response + "esto viene en la respuesta");
          let identity = response.user;
          this.identity = identity;
          console.log(identity);
          if (!this.identity._id) {
            console.log("el usuario no se ha logueado correctamente");
  
            // aqui la alerta
          } else {
            // crear local storage
            localStorage.setItem("identityDocente", JSON.stringify(identity));
  
            this._docenteServices.singupDocente(this.obj, "true").subscribe(
              response => {
                let token = response.token;
                this.token = token;
                console.log(token)
                if (this.token.length <= 0) {
                  // aqui mensaje
                  console.log("el token nose ha generado");
                } else {
                  localStorage.setItem("Token", token);
                  location.reload(true);
                  //location.href = "www.appmontecarlotransvip.com:4200";
                }
              },
              error => {
                this.loading = false;
                var errorMessage = <any>error;
                if (errorMessage) {
                  try {
                    var body = JSON.parse(error._body);
                    errorMessage = body.message;
                  } catch{ errorMessage = "NO hay conexion intentelo Ms Tarde"; }
                  this.error = errorMessage;
                  console.log(this.error);
                }
              }
            );
            //fin
          }
        },
        error => {
          this.loading = false;
          var errorMessage = <any>error;
          if (errorMessage) {
            try {
              var body = JSON.parse(error._body);
              errorMessage = body.message;
            } catch{ errorMessage = "No hay conexión intentelo más tarde"; }
            this.error = errorMessage;
            console.log(this.error);
          }
        });
        break;
    }
  }
}

