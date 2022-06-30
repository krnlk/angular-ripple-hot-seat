"use strict";
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { RestapiService } from 'src/app/restapi.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { AppComponent } from 'src/app/app.component';
import { HostListener } from '@angular/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

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

  dataResponse: any;

  //if login fails
  loginError: boolean = false;

  constructor(public app: AppComponent, private http: LoginService, private router: Router) {
    //unlike in appservice, this does work in constructor - might cause issues later down the line
    this.checkIfLogged();
  }

  ngOnInit(): void {
  }

  doLogin() {
    this.doGetLogin();
  }

  doGetLogin() {
    this.http.getLogin(this.username, this.password).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        // storing JWT
        localStorage.setItem('token', response);

        // storing user info
        localStorage.setItem('username', this.username);

        // get userId and isAdmin
        this.doGetUserInfo();

        //po udanym zalogowaniu przenosi na strone glowna
        this.router.navigateByUrl('');
        this.app.showMatToolbar();
      },
      error => {
        // if an error happens, show a red message
        console.log('Error: ');
        console.log(error);
        this.handleLoginError();
      }
    )
  }

  doGetUserInfo() {
    this.http.getUserInfo(this.username).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        //var arrg = JSON.parse(response);

        this.dataResponse = response;

        // user info
        localStorage.setItem('userId', this.dataResponse.id);
        localStorage.setItem('isAdmin', this.dataResponse.isAdmin);
        //this.app.showMatToolbar()
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

   // pressing enter is the same as clicking register key
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.doLogin();
    }
  }

  // handles login error
  handleLoginError() {
    this.loginError = true;
  }

  // in case the user is already logged in, he should be routed out of the login page
  checkIfLogged () {
    if(this.http.isLoggedIn() == true) {
      this.router.navigateByUrl('');
    }
    // in case the user is not logged in, the top toolbar should be now hidden
    else this.app.hideMatToolbar();
  }

  /*
  showMatToolbar() {
    let matToolbar: any = <any>document.getElementById("matToolbar");
    matToolbar.classList.remove("hidden");
  }*/

}



