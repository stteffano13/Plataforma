import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';

//import jsPDF from 'jspdf';
@Injectable()
export class InsumoService {
    public url: String;
    public identity;
    public token;
    public cont = 0;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    registerInsumo(insumo_to_register) {
        let json = JSON.stringify(insumo_to_register);
        let params = json;
        console.log("Materia", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerInsumo", params, { headers: headers })
            .map(res => res.json());
    }

    registerInsumoB(insumob_to_register) {
        let json = JSON.stringify(insumob_to_register);
        let params = json;
        console.log("Materia", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "registerInsumoB", params, { headers: headers })
            .map(res => res.json());
    }

    getDescInsumos(insumo_to_search) {
        let json = JSON.stringify(insumo_to_search);
        let params = json;
        console.log("Materia", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "getDiscInsumo", params, { headers: headers })
            .map(res => res.json());
    }


    getDescInsumosB(insumoB_to_search) {
        let json = JSON.stringify(insumoB_to_search);
        let params = json;
        console.log("Materia", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .post(this.url + "getDiscInsumoB", params, { headers: headers })
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