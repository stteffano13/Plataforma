import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';

//import jsPDF from 'jspdf';
@Injectable()
export class MatriculaService {
    public url: String;
    public identity;
    public token;
    public cont = 0;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }


    registerMatricula(matricula_to_register) {
        let json = JSON.stringify(matricula_to_register);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerMatricula", params, { headers: headers })
            .map(res => res.json());
    }


    buscarMatriculas(buscar) {
        console.log("dentro de buscar docentes" + buscar);
        let json = JSON.stringify(buscar);
        let params = json;
        //console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http.get(this.url + "buscarMatriculas/" + buscar, { headers: headers })
            .map(res => res.json());

    }

    buscarEstudianteMatricula(buscar) {
        console.log("dentro de buscar docentes" + buscar);
        let json = JSON.stringify(buscar);
        let params = json;
        //console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http.get(this.url + "buscarEstudianteMatricula/" + buscar, { headers: headers })
            .map(res => res.json());

    }

    getListadoMioMateria() {
        console.log("ver si va el token", this.getToken());
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
          .get(this.url + "getListadoMioMateriasE",  { headers: headers })
          .map(res => res.json());
      }
    

    update_matricula(matricula_to_update) {


        let json = JSON.stringify(matricula_to_update);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .put(this.url + "update-matricula/" + matricula_to_update._id, params, { headers: headers })
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
