"use strict";
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
        return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/login?username=${username}&password=${password}`, {responseType: 'text'})
    }

    // Log the user off and remove any cookies/localStorage items (username, token, isAdmin etc)
    logoutUser() {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('userId')
      this.router.navigate(['/'])
    }

    getToken() {
      // napisane w taki sposob, aby tymczasowo naprawic pewien blad przy logowaniu i autoryzacji
      return localStorage.getItem('token')
    }

    // checks if the user is logged in
    isLoggedIn(){
      // https://www.youtube.com/watch?v=7L80dKtfHe0&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=25
      // wedlug tego tutoriala, takie podwojne zaprzeczenie oznacza, ze metoda zwroci albo true, albo false (w zaleznosci od tego, czy ktos jest zalogowany)
      return !!localStorage.getItem('token')
    }

    //Gets the values from localStorage, making it so it isn't neccessary to refresh the page before seeing the changes take effect
    getUsername(){
      //If you are logged in, get the username
      if(this.isLoggedIn()) return localStorage.getItem('username') 
      else return '' 
    }

    isAdmin () {
      if(localStorage.getItem('isAdmin')==="true") return true;
      else return false;
    }

    getUserInfo(username: string){
      return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/users/byUsername/${username}`)
    }
}
