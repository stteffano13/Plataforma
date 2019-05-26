import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';

//import jsPDF from 'jspdf';
@Injectable()
export class MateriaService {
    public url: String;
    public identity;
    public token;
    public cont = 0;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }


    registerMateria(materia_to_register) {
        let json = JSON.stringify(materia_to_register);
        let params = json;
        console.log("Materia",params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerMateria", params, { headers: headers })
            .map(res => res.json());
    }

    buscarMaterias(buscar) {
        console.log("dentro de buscar docentes" + buscar);
        let json = JSON.stringify(buscar);
        let params = json;
        //console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http.get(this.url + "buscarMaterias/" + buscar, { headers: headers })
          .map(res => res.json());
    
      }


      
  getListadoMioMateria() {
   
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .get(this.url + "getListadoMioMaterias",  { headers: headers })
      .map(res => res.json());
  }


  getListadoMateriaCurso(curso) {


    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .get(this.url + "getListadoMateriasCurso/"+curso, { headers: headers })
      .map(res => res.json());
  }
 
  

      update_materia(materia_to_update) {


        let json = JSON.stringify(materia_to_update);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .put(this.url + "update-materia/" + materia_to_update._id, params, { headers: headers })
            .map(res => res.json());
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
}
