import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})

export class LoginService{
    private apiUrl = 'login';
    constructor(private http: HttpClient) {}

//https://www.youtube.com/watch?time_continue=694&v=poQLnZU0eHc&feature=emb_title
//private baseURL = "http:localhost:8080/login";
/*
constructor(private HttpClient: HttpClient) {}

getLogin():  Observable<User[]>{
    return this.HttpClient.get<User[]>(`${this.baseURL}`);
}
*/
// https://www.ai.codersarts.com/post/how-to-integrate-angular-with-spring-boot


getLogin(username: string, password: string) {
    console.log("Trying to log in...");
    this.http.get(`http://localhost:8080/login?username=${username}&password=${password}`).subscribe(
        data=>{
            console.log("The login worked.");
        }
    )
}   


/*
getLogin(username: string, password: string): Promise<Array<User>> {
    const url = `${this.apiUrl}?username=${username}&password=${password}`;

    return this.http.get(this.apiUrl)
        .toPromise()
 .then(response => response.json() as User[])
}
*/


}