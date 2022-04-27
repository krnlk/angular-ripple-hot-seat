import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class LoginService{

//https://www.youtube.com/watch?time_continue=694&v=poQLnZU0eHc&feature=emb_title
//private baseURL = "http:localhost:8080/login";
/*
constructor(private HttpClient: HttpClient) {}

getLogin():  Observable<User[]>{
    return this.HttpClient.get<User[]>(`${this.baseURL}`);
}
*/
// https://www.ai.codersarts.com/post/how-to-integrate-angular-with-spring-boot
private apiUrl = '/login';
constructor(private http: HttpClient) {}

/*
getLogin() {
    console.log("Trying to log in...");
    this.http.get('http://localhost:8080/login').subscribe(
        data=>{
            console.log("The login worked.");
        }
    )

}   
*/

getLogin(): Promise<Array<User>> {
    return this.http.get(this.apiUrl)
 .toPromise()
 .then(response => response.json() as Employee[])
 .catch(this.handleError);
}

}