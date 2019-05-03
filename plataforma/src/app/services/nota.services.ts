import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';

//import jsPDF from 'jspdf';
@Injectable()
export class NotaService {
    public url: String;
    public identity;
    public token;
    public cont = 0;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }


    registerNota(nota_to_register) {
        let json = JSON.stringify(nota_to_register);
        let params = json;
        console.log("Materia",params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerNota", params, { headers: headers })
            .map(res => res.json());
    }


      
    buscarNotas(notas_buscar) {
        let json = JSON.stringify(notas_buscar);
        let params = json;
        console.log("mijin la ultima par manda a buscar notas" ,params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "buscarNotas", params, { headers: headers })
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
