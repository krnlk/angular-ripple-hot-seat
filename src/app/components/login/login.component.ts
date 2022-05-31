"use strict";
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { RestapiService } from 'src/app/restapi.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//implements onInit
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  message: any

  constructor(private http: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  //pozycja w kontekście https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position

  //1. przy logowaniu: albo dostajemy jsona is admin, login, password
  //2. do serwera zapytanie o usera (isAdmin, email etc)
  doLogin() {
    //this.http.get<any>(`http://localhost:8080/login?username=${this.username}&password=${this.password}`)
    this.http.getLogin(this.username, this.password).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        //przetrzymywanie JWT
        localStorage.setItem('token', response);

        //user info
        localStorage.setItem('username', this.username);
        //localStorage.setItem('isAdmin', response);



        //po udanym zalogowaniu przenosi na strone glowna
        this.router.navigateByUrl('');
        this.showMatToolbar();
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  showMatToolbar() {
    let matToolbar: any = <any>document.getElementById("matToolbar");
    matToolbar.classList.remove("hidden");
  }

}



