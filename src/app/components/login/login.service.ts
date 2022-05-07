import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService{
    private apiUrl = 'login';
    constructor(private http: HttpClient, private router: Router) {}

    getLogin(username: string, password: string) {
        console.log("Trying to log in...");
        return this.http.get(`http://localhost:8080/login?username=${username}&password=${password}`, {responseType: 'text'})
    }

    getToken() {
      if ('token' != null) return localStorage.getItem('token')
      else return
    }

/*
getLogin(username: string, password: string) {
    console.log("Trying to log in...");
    return this.http.get<any>(`http://localhost:8080/login?username=${username}&password=${password}`, {
  observe: 'body', responseType: 'text'
})
        .subscribe(
        response=>{
            console.log('Response: ');
            console.log(response);
            localStorage.setItem('tokenData', JSON.stringify(response));
            //localStorage.setItem('token', response.token)
            this.router.navigateByUrl('/home'); 
        },
        error => {
            console.log('Error: ');
            console.log(error);
          }
        //bearer token nie jest nigdzie przechowywany 
        // https://dev-academy.com/angular-jwt/
    )
}   
*/
}