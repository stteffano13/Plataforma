import { Component } from '@angular/core';
import { AdministradorService } from "../services/administrador.services";
import { DocenteService } from "../services/docente.services";
import { EstudianteService } from "../services/estudiante.services";

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent {

  constructor(private _adminServices: AdministradorService, private _docenteServices: DocenteService, private _estudianteServices: EstudianteService) { }
  public banderLoguin;
  public obj = {
    email: null,
    password: null
  };
  public identity;
  public token;
  public loading = false;
  public error = "";
  public mensajeerrormodals;

   // subscribes variables
   public subscribe1;
   public subscribe2;
   public subscribe3;
   public subscribe4;
   public subscribe5;
   public subscribe6;
  ngOnDestroy()
  {
    console.log("chao");
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
    
   
    
  }

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

    if (this.banderLoguin != null) {

      switch (this.banderLoguin) {
        case "administrador":
          this.loading = true;
          if (this.obj.email != null && this.obj.password != null) {
           this.subscribe1= this._adminServices.singupAdministrador(this.obj, "").subscribe(
              response => {
                this.loading = false;
                let identity = response.user;
                this.identity = identity;
                if (!this.identity._id) {
                  this.loading = false;
                  this.mensajeerrormodals = "Clave incorrecta el usuario no se pudo autenticar";
                  document.getElementById("openModalError").click();
                  // aqui la alerta
                } else {
                  // crear local storage
                  localStorage.setItem("identityAdmin", JSON.stringify(identity));
                  this.subscribe2=  this._adminServices.singupAdministrador(this.obj, "true").subscribe(
                    response => {
                      let token = response.token;
                      this.token = token;
                      console.log(token)
                      if (this.token.length <= 0) {
                        this.loading = false;
                        this.mensajeerrormodals = "El token no se ha generado";
                        document.getElementById("openModalError").click();
                      } else {
                        localStorage.setItem("Token", token);
                        location.reload(true);
                      }
                    },
                    error => {
                      this.loading = false;
                      var errorMessage = <any>error;
                      if (errorMessage) {
                        try {
                          var body = JSON.parse(error._body);
                          errorMessage = body.message;
                        } catch{
                          errorMessage = "No hay conexion intentelo mas Tarde";
                          this.loading = false;
                          this.mensajeerrormodals = errorMessage;
                          document.getElementById("openModalError").click();
                        }
                        this.error = errorMessage;
                        this.loading = false;
                        this.mensajeerrormodals = this.error;
                        document.getElementById("openModalError").click();
                      }
                    }
                  );
                  //fin
                }
              },
              error => {

                var errorMessage = <any>error;
                if (errorMessage) {
                  try {
                    var body = JSON.parse(error._body);
                    errorMessage = body.message;
                  } catch{
                    errorMessage = "No hay conexión intentelo más tarde";
                    this.loading = false;
                    this.mensajeerrormodals = errorMessage;
                    document.getElementById("openModalError").click();
                  }
                  this.loading = false;
                  this.error = errorMessage;
                  this.mensajeerrormodals = this.error;
                  document.getElementById("openModalError").click();
                }
              });

          } else {
            this.loading = false;
            this.mensajeerrormodals = "Existen campos en vacios introduce Usuario y Contraseña";
            document.getElementById("openModalError").click();

          }
          break;

        // registro administrador

        case "docente":
          this.loading = true;
          if (this.obj.email != null && this.obj.password != null) {
            this.subscribe3= this._docenteServices.singupDocente(this.obj, "").subscribe(
              response => {
                this.loading = false;
                let identity = response.user;
                this.identity = identity;
                console.log(identity);
                if (!this.identity._id) {
                  this.mensajeerrormodals = "Clave incorrecta el usuario no se pudo autenticar";
                  document.getElementById("openModalError").click();
                } else {
                  // crear local storage
                  localStorage.setItem("identityDocente", JSON.stringify(identity));

                  this.subscribe4=this._docenteServices.singupDocente(this.obj, "true").subscribe(
                    response => {
                      let token = response.token;
                      this.token = token;
                      console.log(token)
                      if (this.token.length <= 0) {
                        this.mensajeerrormodals = "El token no se ha generado";
                        document.getElementById("openModalError").click();
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
                        } catch{
                          errorMessage = "No hay conexión intentelo más tarde";
                          this.loading = false;
                          this.mensajeerrormodals = errorMessage;
                          document.getElementById("openModalError").click();
                        }
                        this.loading = false;
                        this.error = errorMessage;
                        this.mensajeerrormodals = this.error;
                        document.getElementById("openModalError").click();
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
                  } catch{
                    errorMessage = "No hay conexión intentelo más tarde";
                    this.loading = false;
                    this.mensajeerrormodals = errorMessage;
                    document.getElementById("openModalError").click();
                  }
                  this.loading = false;
                  this.error = errorMessage;
                  this.mensajeerrormodals = this.error;
                  document.getElementById("openModalError").click();
                }
              });
          } else {
            this.loading = false;
            this.mensajeerrormodals = "Existen campos en vacios introduce Usuario y Contraseña";
            document.getElementById("openModalError").click();

          }
          break;
        case "estudiante":
        this.loading = true;
        if (this.obj.email != null && this.obj.password != null) {
          this.subscribe5=this._estudianteServices.singupEstudiante(this.obj, "").subscribe(
            response => {
              this.loading = false;
              let identity = response.user;
              this.identity = identity;
              console.log(identity);
              if (!this.identity._id) {
                this.mensajeerrormodals = "Clave incorrecta el usuario no se pudo autenticar";
                document.getElementById("openModalError").click();
              } else {
                // crear local storage
                localStorage.setItem("identityEstudiante", JSON.stringify(identity));

                this.subscribe6=this._estudianteServices.singupEstudiante(this.obj, "true").subscribe(
                  response => {
                    let token = response.token;
                    this.token = token;
                    console.log(token)
                    if (this.token.length <= 0) {
                      this.mensajeerrormodals = "El token no se ha generado";
                      document.getElementById("openModalError").click();
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
                      } catch{
                        errorMessage = "No hay conexión intentelo más tarde";
                        this.loading = false;
                        this.mensajeerrormodals = errorMessage;
                        document.getElementById("openModalError").click();
                      }
                      this.loading = false;
                      this.error = errorMessage;
                      this.mensajeerrormodals = this.error;
                      document.getElementById("openModalError").click();
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
                } catch{
                  errorMessage = "No hay conexión intentelo más tarde";
                  this.loading = false;
                  this.mensajeerrormodals = errorMessage;
                  document.getElementById("openModalError").click();
                }
                this.loading = false;
                this.error = errorMessage;
                this.mensajeerrormodals = this.error;
                document.getElementById("openModalError").click();
              }
            });
        } else {
          this.loading = false;
          this.mensajeerrormodals = "Existen campos en vacios introduce Usuario y Contraseña";
          document.getElementById("openModalError").click();

        }
          break;
      }
    } else {
      this.mensajeerrormodals = "Seleciona el usuario con el que te deseas autenticar";
      document.getElementById("openModalError").click();
    }
  }
}

