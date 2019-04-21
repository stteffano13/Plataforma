import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';

//import jsPDF from 'jspdf';
@Injectable()
export class EstudianteService {
  public url: String;
  public identity;
  public token;
  public cont = 0;
  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }


  singupEstudiante(docente_to_login, getHash) {
    if (getHash != " ") {
      console.log("aqui va el hash");
      docente_to_login.getHash = getHash;
      console.log(docente_to_login.getHash);
    }
    let json = JSON.stringify(docente_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "loginEstudiante", params, { headers: headers })
      .map(res => res.json());
  }



  registerEstudiante(estudiante_to_register) {
    let json = JSON.stringify(estudiante_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .post(this.url + "registerEstudiante", params, { headers: headers })
      .map(res => res.json());
  }


  buscarEstudiantes(buscar) {
    console.log("dentro de buscar docentes" + buscar);
    let json = JSON.stringify(buscar);
    let params = json;
    //console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http.get(this.url + "buscarEstudiantes/" + buscar, { headers: headers })
      .map(res => res.json());

  }




  getListadoEstudiantes() {


    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .get(this.url + "getListadoEstudiantes", { headers: headers })
      .map(res => res.json());
  }



  update_estudiante(estudiante_to_update, estadoContrasena) {
    estudiante_to_update.estadoContrasena = estadoContrasena;
    console.log("clave docente antes de mndar",estudiante_to_update.estadoContrasena);
    let json = JSON.stringify(estudiante_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + "update-estudiante/" + estudiante_to_update._id, params, { headers: headers })
      .map(res => res.json());
  }



  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identityEstudiante"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {

    let token = localStorage.getItem("Token");
    console.log("este es el falso token" + token);
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  logout() {
    localStorage.removeItem("identityEstudiante");
    localStorage.removeItem("Token");
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }


}
