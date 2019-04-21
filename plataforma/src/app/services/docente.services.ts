import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Observable} from 'rxjs/Observable';

//import jsPDF from 'jspdf';
@Injectable()
export class DocenteService {
  public url: String;
  public identity;
  public token;
public cont =0;
  constructor(private _http: Http ) {
    this.url = GLOBAL.url;
  }


  singupDocente(docente_to_login, getHash) {
    if (getHash!=" ") {
      console.log("aqui va el hash");
      docente_to_login.getHash = getHash;
      console.log(docente_to_login.getHash);
    }
    let json = JSON.stringify(docente_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http 
      .post(this.url + "loginDocente", params, { headers: headers })
      .map(res => res.json());
  }



  registerDocente(docente_to_register) {
    let json = JSON.stringify(docente_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .post(this.url + "registerDocente", params, { headers: headers })
      .map(res => res.json());
  }


  update_docente(docente_to_update, estadoContrasena) {
    docente_to_update.estadoContrasena = estadoContrasena;
    console.log("clave docente antes de mndar",docente_to_update.estadoContrasena);
    let json = JSON.stringify(docente_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + "update-docente/" + docente_to_update._id, params, { headers: headers })
      .map(res => res.json());
  }



  getListadoDocentes() {
   
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .get(this.url + "getListadoDocentes",  { headers: headers })
      .map(res => res.json());
  }


  buscarDocentes(buscar) {
    console.log("dentro de buscar docentes" + buscar);
    let json = JSON.stringify(buscar);
    let params = json;
    //console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http.get(this.url + "buscarDocentes/" + buscar, { headers: headers })
      .map(res => res.json());

  }



  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identityDocente"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    
    let token = localStorage.getItem("Token");
    console.log("este es el falso token"+token);
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  logout() {
    localStorage.removeItem("identityDocente");
    localStorage.removeItem("Token");
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }


}
