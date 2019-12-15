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


    subirNotas(estado) {
        let json = JSON.stringify(estado);
        let params = json;
        console.log("estado subir nota", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url +"subirNotas",params, { headers: headers })
            .map(res => res.json());
    }


    registerNota(nota_to_register) {
        let json = JSON.stringify(nota_to_register);
        let params = json;
        console.log("Materia", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerNota", params, { headers: headers })
            .map(res => res.json());
    }


    registerNotaB(notaB_to_register) {
        let json = JSON.stringify(notaB_to_register);
        let params = json;
        console.log("Materia", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerNotaB", params, { headers: headers })
            .map(res => res.json());
    }



    buscarNotas(notas_buscar) {

        let json = JSON.stringify(notas_buscar);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http.post(this.url + "buscarNotas", params, { headers: headers }).map(res => res.json());
    }




    

    buscarNotasB(notasB_buscar) {

        let json = JSON.stringify(notasB_buscar);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "buscarNotasB", params, { headers: headers })
            .map(res => res.json());
    }


    buscarNotasEstudiante(notasE_buscar) {
        var objFecha = {
            fecha: notasE_buscar
        }

        console.log("buscador de periodo", objFecha);
        let json = JSON.stringify(objFecha);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "buscarNotasEstudiante", params, { headers: headers })
            .map(res => res.json());
    }


    buscarNotasEstudianteB(notasEB_buscar) {
        var objFecha = {
            fecha: notasEB_buscar
        }

        console.log("buscador de periodo", objFecha);
        let json = JSON.stringify(objFecha);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "buscarNotasEstudianteB", params, { headers: headers })
            .map(res => res.json());
    }


    
    buscarNotasMatris(notas_buscar) {

        let json = JSON.stringify(notas_buscar);
        let params = json;
      
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "buscarNotasMatris", params, { headers: headers })
            .map(res => res.json());
    }
 
    buscarNotasMatrisB(notasB_buscar) {

        let json = JSON.stringify(notasB_buscar);
        let params = json;
      
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "buscarNotasMatrisB", params, { headers: headers })
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
