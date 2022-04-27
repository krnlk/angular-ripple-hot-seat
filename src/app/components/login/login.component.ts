import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { RestapiService } from 'src/app/restapi.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//implements onInit
export class LoginComponent{
  username!: string;
  password!: string;
  message:any
  

  //constructor(private service:RestapiService,private router:Router) { }
  constructor(public service:LoginService){

  }

  
  ngOnInit(): void {

  }
  

  
  doLogin(){
    console.log("Button is working");
    this.service.getLogin(this.username, this.password);
    }

    /*
    let resp= this.service.login(this.username, this.password);
    resp.subscribe(data=>{
      console.log(data)
      this.message = data;
      this.router.navigate(["/home"])
    })
    
    */


  }
  


