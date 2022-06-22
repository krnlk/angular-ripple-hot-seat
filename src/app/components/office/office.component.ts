"use strict";
import { Component, Input } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { OfficeService } from './office.service';
import { OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { ActivatedRoute } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

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

@Injectable()
export class OfficeComponent {
  // skradzione z https://www.youtube.com/watch?v=Oz6zuhjrMi4

  //a bunch of data for inputs n stuff
  //bandaid
  //imgUrl: string = '6276a11274ea2f51b016c7a8';
  imgUrl!: string;

  DateCurrent: Date = new Date();
  jstoday = '';

  imageToShow: any;
  isImageLoading!: boolean;
  imageLoaded!: boolean;

  //for queries
  dateFrom!: string;
  dateUntil!: string;
  timeFrom = '09:00';
  timeUntil = '17:00';

  //variables for posting a room
  public officeId: any;
  officeIdChange: Subject<string> = new Subject<string>();

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
  percentDone!: number;
  uploadSuccess!: boolean;

  height!: number;
  width!: number;

  // object stores the list of dots/rooms
  obj: any;

  // stores the list of offices
  offices: any;
  // office data
  officeName!: string;

  // stores the list of levels of that office
  levels: any;
  // id and number of a level in an office that's being displayed
  levelId!: string;
  public levelNumber!: number;

  // stores all rooms
  rooms: any;
  // room data
  roomId!: string;
  roomNumber!: number;

  //file to be uploaded
  //selectedFile: File;

  selectedFile!: ImageSnippet;

  constructor(private service: OfficeService, public login: LoginService, public http: HttpClient) {
    this.dateFrom = formatDate(this.DateCurrent, 'YYYY-MM-dd', 'en-US', '+0530');
    this.dateUntil = this.dateFrom;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.service.uploadImage(this.selectedFile.file).subscribe();
    });
    reader.readAsDataURL(file);
  }

  // upLoadFile(){
  //   this.service.uploadImage(this.selectedFile.file).subscribe();
  // }

  // mostly for testing - it shouldn't download all offices in the future, just one
  ngOnInit(): void {
    console.log(this.dateFrom);
    //this.getImageFromService();  //powinien byc obrazek dla tego konkretnego pietra, w kazdym razie 
    this.doAddDot();
    this.doGetOffices();
    this.doGetLevels();
  }

  //returns all offices that exist
  doGetOffices() {
    this.service.getOffices().subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        this.offices = response;
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  //returns all levels in the current office
  doGetLevels() {
    this.service.getLevels(this.officeId).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        this.levels = response;
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  //do what you want cuz being a pirate is free, you are a pirate!
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      this.height = this.imageToShow.height;
      this.width = this.imageToShow.width;
      console.log(this.height, this.width);
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
      this.imageLoaded = true;
    }, error => {
      this.isImageLoading = false;
      this.imageLoaded = false;
      console.log(error);
    });
  }


  //read a room image
  doGetRoomImage() {
    this.service.getRoomImage(this.roomId).subscribe(
      response => {
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
  doPostRoomImage() {

  }

  //makes a request to the database regarding the reservations that fit so and so criteria
  doSearch() {

  }

  //update dates for showing desks
  updateDateQuery() {
    this.dateFrom = this.Input1;
    this.dateUntil = this.Input2;
  }

  //update time for showing desks
  updateTimeQuery() {
    this.timeFrom = this.Input1;
    this.timeUntil = this.Input2;
  }

  //adds a new office
  doAddOffice() {
    let post = {
      name: this.officeName
    };

    console.log(post);

    this.service.addOffice(post).subscribe(
      (data) => {
        console.log('An office has been added.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while adding an office.');
        console.log(error);
        console.log(post);
      }
    )
  }

  //adds a level in this office
  //adding an image will always be done separately
  doAddLevel() {
    let post = {
      officeId: this.officeId,
      number: this.levelNumber
    };
    this.service.addLevel(post).subscribe(
      (data) => {
        console.log('A level in an office has been added.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while adding a level: ');
        console.log(error);
      }
    )
  }

  //adds a room in this office at this level
  //adding an image will always be done separately, inside the room's page
  doAddRoom() {
    let post = {
      levelId: this.levelId,
      number: this.roomNumber,
      positionX: this.positionX,
      positionY: this.positionY
    };
    this.service.addRoom(post).subscribe(
      (data) => {
        console.log('A level in an office has been added.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while adding a level: ');
        console.log(error);
      }
    )
  }

  //adds a dot on the image, the dot's color will signify how many desks are taken
  doAddDot() {
    console.log('Trying to add dots...');
    //later change it to officeId or getOfficeId
    this.service.addDot(this.officeId).subscribe(
      response => {
        console.log('Response: ');
        console.log('Dots have been added.');
        console.log(response);

        this.obj = response;

      },
      error => {
        console.log('Error: ');
        console.log('Adding dots failed.');
        console.log(error);
      }
    )
  }

  //get coordinates of a mouse
  mouseMoved(event: MouseEvent) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }

  // POP UP WINDOWS SPAM HURRAY
   // add office
   openAddOfficeDialog() {
    let addOfficeDialog: any = <any>document.getElementById("addOfficeDialog");
    addOfficeDialog.showModal();
  }

  closeAddOfficeDialog() {
    let addOfficeDialog: any = <any>document.getElementById("addOfficeDialog");
    addOfficeDialog.close();
  }

   // add level
   openAddLevelDialog() {
    let addLevelDialog: any = <any>document.getElementById("addLevelDialog");
    addLevelDialog.showModal();
  }

  closeAddLevelDialog() {
    let addLevelDialog: any = <any>document.getElementById("addLevelDialog");
    addLevelDialog.close();
  }

  // add room
  openAddRoomDialog() {
    let addRoomDialog: any = <any>document.getElementById("addRoomDialog");
    addRoomDialog.showModal();
  }

  closeAddRoomDialog() {
    let addRoomDialog: any = <any>document.getElementById("addRoomDialog");
    addRoomDialog.close();
  }

  // remove office
  openRemoveOfficeDialog() {
    let removeOfficeDialog: any = <any>document.getElementById("removeOfficeDialog");
    removeOfficeDialog.showModal();
  }

  closeRemoveOfficeDialog() {
    let removeOfficeDialog: any = <any>document.getElementById("removeOfficeDialog");
    removeOfficeDialog.close();
  }

  // remove level
  openRemoveLevelDialog() {
    let removeLevelDialog: any = <any>document.getElementById("removeLevelDialog");
    removeLevelDialog.showModal();
  }

  closeRemoveLevelDialog() {
    let removeLevelDialog: any = <any>document.getElementById("removeLevelDialog");
    removeLevelDialog.close();
  }

  // remove room
  openRemoveRoomDialog() {
    let removeRoomDialog: any = <any>document.getElementById("removeRoomDialog");
    removeRoomDialog.showModal();
  }

  closeRemoveRoomDialog() {
    let removeRoomDialog: any = <any>document.getElementById("removeRoomDialog");
    removeRoomDialog.close();
  }

  // remove room - are you sure?
  openRemoveSureDialog() {
    let removeSureDialog: any = <any>document.getElementById("removeSureDialog");
    removeSureDialog.showModal();
  }

  closeRemoveSureDialog() {
    let removeSureDialog: any = <any>document.getElementById("removeSureDialog");
    removeSureDialog.close();
  }

  // edit desk
  openEditDeskDialog() {
    let editDeskDialog: any = <any>document.getElementById("editDeskDialog");
    editDeskDialog.showModal();
  }

  closeEditDeskDialog() {
    let editDeskDialog: any = <any>document.getElementById("editDeskDialog");
    editDeskDialog.close();
  }

  // position
  openPositionDialog() {
    let positionDialog: any = <any>document.getElementById("positionDialog");
    positionDialog.showModal();
  }

  closePositionDialog() {
    let positionDialog: any = <any>document.getElementById("positionDialog");
    positionDialog.close();
  }

  // popup window for setting up the date from, date to
  openDateDialog() {
    let dateDialog: any = <any>document.getElementById("dateDialog");
    dateDialog.showModal();
  }

  closeDateDialog() {
    let dateDialog: any = <any>document.getElementById("dateDialog");
    dateDialog.close();
  }

  // popup window for setting up the time from, time until
  openTimeDialog() {
    let timeDialog: any = <any>document.getElementById("timeDialog");
    timeDialog.showModal();
  }

  closeTimeDialog() {
    let timeDialog: any = <any>document.getElementById("timeDialog");
    timeDialog.close();
  }

  //functions for sharing data with other components

  // updates officeId
  setOfficeId(officeId: any) {
    this.officeId = officeId;
    this.officeIdChange.next(this.officeId);
    sessionStorage.setItem('officeId', this.officeId);

    // get levels for this particular office
    this.doGetLevels();

    // after a new office is loaded, image along with the dots should be loaded
    // this.doAddDot();
  }

  // updates the current level in a particular office
  setLevel(levelId: any, levelNumber: number) {
    // if there is even an officeId to work with in the first place
    if (this.officeId != undefined) {
      this.levelId = levelId;
      this.levelNumber = levelNumber;
      sessionStorage.setItem('levelId', this.levelId);
      sessionStorage.setItem('levelNumber', this.levelNumber.toString());

      // after a new office is loaded and a level is selected, image along with the dots should be loaded
      this.doAddDot();
    }
  }

  // gets officeId
  getOfficeId() {
    return this.officeId;
  }

  title = 'jakakolwiek-nazwa';
}


