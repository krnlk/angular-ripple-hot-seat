"use strict";
import { Component } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { OfficeService } from './office.service';
import { OnInit } from '@angular/core';
import { BoundTarget } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

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

/*
//npm i dateformat
let dateFormat = require('dateformat');
let DateCurrent = new Date();
dateFormat(DateCurrent, "dddd, mmmm dS, yyyy, h:MM:ss TT");
*/

export class OfficeComponent {
  // skradzione z https://www.youtube.com/watch?v=Oz6zuhjrMi4

  imgUrl: string = '6276a11274ea2f51b016c7a8';

  rooms: any;
  DateCurrent: Date = new Date();
  jstoday = '';
  room_id: any;
  
  imageToShow: any;
  isImageLoading!: boolean;

  dateFrom!: string;
  dateUntil!: string;
  timeFrom = '7:00';
  timeUntil = '15:00';
  Input1!: string;
  Input2!: string;


  constructor(private service: OfficeService, public http: HttpClient) 
  {
    //this.jstoday = formatDate(this.DateCurrent, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.dateFrom = formatDate(this.DateCurrent, 'dd-MM-yyyy', 'en-US', '+0530');
    this.dateUntil = this.dateFrom;
  }


  // mostly for testing - it shouldn't download all offices in the future, just one
  ngOnInit(): void{
    this.getImageFromService();
    /*
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
    */
  }

  //do what you want cuz being a pirate is free, you are a pirate!
createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

// basically prints an image
getImageFromService() {
  this.isImageLoading = true;
  this.service.getImage(this.imgUrl).subscribe(data => {
    this.createImageFromBlob(data);
    this.isImageLoading = false;
  }, error => {
    this.isImageLoading = false;
    console.log(error);
  });
}


  //read a room image
  doGetRoomImage(){
    this.service.getRoomImage("6276a11274ea2f51b016c7a8").subscribe(
      response=> {
        console.log('Response: ');
        console.log(response);
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  //add a room image
  doPostRoomImage(){

  }

  //makes a request to the database regarding the reservations that fit so and so criteria
  doSearch(){

  }

  //update dates for showing desks 
  updateDateQuery(){
    this.dateFrom = this.Input1;
    this.dateUntil = this.Input2;
  }

  //update time for showing desks
  updateTimeQuery(){
    this.timeFrom = this.Input1;
    this.timeUntil = this.Input2;
  }
  
  doAddDot(){
    
  }

  // POP UP WINDOWS SPAM HURRAY
  // add room
  openAddRoomDialog() {
    let addRoomDialog:any = <any>document.getElementById("addRoomDialog");
    addRoomDialog.showModal();
  }

  closeAddRoomDialog() {
    let addRoomDialog:any = <any>document.getElementById("addRoomDialog");
    addRoomDialog.close();
  }

  // remove room
  openRemoveRoomDialog() {
    let removeRoomDialog:any = <any>document.getElementById("removeRoomDialog");
    removeRoomDialog.showModal();
  }

  closeRemoveRoomDialog() {
    let removeRoomDialog:any = <any>document.getElementById("removeRoomDialog");
    removeRoomDialog.close();
  }

  // remove room - are you sure?
  openRemoveSureDialog() {
    let removeSureDialog:any = <any>document.getElementById("removeSureDialog");
    removeSureDialog.showModal();
  }

  closeRemoveSureDialog() {
    let removeSureDialog:any = <any>document.getElementById("removeSureDialog");
    removeSureDialog.close();
  }

  // edit desk
  openEditDeskDialog() {
    let editDeskDialog:any = <any>document.getElementById("editDeskDialog");
    editDeskDialog.showModal();
  }

  closeEditDeskDialog() {
    let editDeskDialog:any = <any>document.getElementById("editDeskDialog");
    editDeskDialog.close();
  }

  // position
  openPositionDialog() {
    let positionDialog:any = <any>document.getElementById("positionDialog");
    positionDialog.showModal();
  }

  closePositionDialog() {
    let positionDialog:any = <any>document.getElementById("positionDialog");
    positionDialog.close();
  }

  // popup window for setting up the date from, date to
  openDateDialog() {
    let dateDialog:any = <any>document.getElementById("dateDialog");
    dateDialog.showModal();
  }

  closeDateDialog() {
    let dateDialog:any = <any>document.getElementById("dateDialog");
    dateDialog.close();
  }

    // popup window for setting up the time from, time until
    openTimeDialog() {
      let timeDialog:any = <any>document.getElementById("timeDialog");
      timeDialog.showModal();
    }
  
    closeTimeDialog() {
      let timeDialog:any = <any>document.getElementById("timeDialog");
      timeDialog.close();
    }

  title = 'jakakolwiek-nazwa';
}

