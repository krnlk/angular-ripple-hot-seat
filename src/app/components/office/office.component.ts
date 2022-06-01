"use strict";
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { OfficeService } from './office.service';
import { OnInit } from '@angular/core';
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

  //a bunch of data for inputs n stuff
  imgUrl: string = '6276a11274ea2f51b016c7a8';

  rooms: any;
  DateCurrent: Date = new Date();
  jstoday = '';
  room_id: any;
  
  imageToShow: any;
  isImageLoading!: boolean;

  //for queries
  dateFrom!: string;
  dateUntil!: string;
  timeFrom = '7:00';
  timeUntil = '15:00';

  //variables for posting a room
  officeId: string = '629718f651a28f41bf39ed02'; //bandaid
  positionX!: number;
  positionY!: number;
  number!: number;
  level!: number;

  ///za darmo jest kalendarz w htmlu
  Input1!: string;
  Input2!: string;
  Input3!: string;

  //cursor's current coordinates on the image (?)
  cursorX!: number;
  cursorY!: number;

  //file to be uploaded
  //selectedFile: File;


  constructor(private service: OfficeService, public http: HttpClient) 
  {
    this.dateFrom = formatDate(this.DateCurrent, 'dd-MM-yyyy', 'en-US', '+0530');
    this.dateUntil = this.dateFrom;
  }

  // mostly for testing - it shouldn't download all offices in the future, just one
  ngOnInit(): void{
    //this.getImageFromService();  
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

  //adds a room at this floor in this office
  //adding an image will always be done separately
  doAddRoom(){
    let post = {
      number: this.number,
      level: this.level,
      officeId: this.officeId,
      positionX: this.positionX,
      positionY: this.positionY
    };

    //do the passwords match?
    this.service.addRoom(post).subscribe(
      (data) => {
        console.log('A desk has been added.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while adding a desk: ');
        console.log(error);
      }
    )
  }
  
  //adds a dot on the image, the dot will signify how many desks are taken
  doAddDot(){
    
  }

  //https://www.youtube.com/watch?v=YkvqLNcJz3Y - uploading files
  //selects a file in PNG format that will be uploaded by submitLevelFile()
  /*
  selectLevelFile(event: { target: { files: File[]; }; }){
    this.selectedFile = <File>event.target.files[0];
  }

  //uploads the selected file to the database
  uploadLevelFile(){
    //bandaid, there should be an image id variable
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/6276a11274ea2f51b016c7a8', fd)
      .subscribe(res => {

      });
  }
  */

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

  //get coordinates of a mouse
  mouseMoved(event: MouseEvent) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
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

