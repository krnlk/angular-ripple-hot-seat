"use strict";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class RestapiService {

    constructor(private http:HttpClient) {}

    //btoa, czyli binary to ASCII
    //ogarnac jeszcze adresy URL, zeby pasowaly do naszego kodu
    public login(username:string,password:string){
        const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
        //return this.http.get("http://localhost:8080/login", {headers, responseType:'text' as 'json'});
        return this.http.get("https://ripple-hot-seat-backend-app.herokuapp.com/login", {headers, responseType:'text' as 'json'});
    }

    public getUsers(){
        let username="kornelek";
        let password="abc123";
        const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
        //return this.http.get("http://localhost:8080/getUsers", {headers});
        return this.http.get("https://ripple-hot-seat-backend-app.herokuapp.com/getUsers", {headers});
    }
}
