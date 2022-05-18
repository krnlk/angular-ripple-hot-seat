"use strict";
import { Component } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { OfficeService } from './office.service';
import { OnInit } from '@angular/core';
import { BoundTarget } from '@angular/compiler';

/*
interface Room {
  id: string;
  number: string;
  level: string;
  office: string;
  picture: string;
}*/

@Component({
  selector: 'office-component',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})


export class OfficeComponent {
  // skradzione z https://www.youtube.com/watch?v=Oz6zuhjrMi4

  rooms: any;
  constructor(public http: HttpClient) {}


  // mostly for testing - it shouldn't download all offices in the future, just one
  ngOnInit(): void{
    this.http.get("https://ripple-hot-seat-backend-app.herokuapp.com/login?username=login&password=password", {responseType: 'text'})
    .subscribe(
      responseLogin => {
        let token = responseLogin;
        this.http.get("https://ripple-hot-seat-backend-app.herokuapp.com/rooms", {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '+token
          })
        }).subscribe(
          responseRoom => {
            console.log('responseRoom ');
            console.log(responseRoom);
            this.rooms = responseRoom;
          },
          errorRoom => {
            console.log('errorRoom ');
            console.log(errorRoom);
          } 
        )
      }
    );
  }

  
  openMyDialog() {
    let myDialog:any = <any>document.getElementById("myDialog");
    myDialog.showModal();
  }

  closeMyDialog() {
    let myDialog:any = <any>document.getElementById("myDialog");
    myDialog.close();
  }

  title = 'jakakolwiek-nazwa';
}

