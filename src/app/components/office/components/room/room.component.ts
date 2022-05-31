import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { RoomService} from  './room.service';
import { formatDate } from '@angular/common';
import { BindingScope } from '@angular/compiler/src/render3/view/template';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  imgUrl: string = '6276a11274ea2f51b016c7a8';

  rooms: any;
  room_id: any;
  
  imageToShow: any;
  isImageLoading!: boolean;

  //for queries
  Input1!: string;
  Input2!: string;
  Input3!: string;
  positionX!: number;
  positionY!: number;
  number!: number;
  positioning!: string;

  //cursor's current coordinates on the image (?)
  cursorX!: number;
  cursorY!: number;
  pageX!: number;
  pageY!: number;


  //file to be uploaded
  //selectedFile: File;


  constructor(private service: RoomService, public http: HttpClient) 
  {

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


  //posts a desk to the database & then forces gets all the desks on the image again
  doAddDesk(){
    
  }

  //upload's the room file to the database
  doUploadRoomFile() {

  }

  //funkcja do zczytywania rozmiaru obrazka, zapisac wartosci rozmiaru obrazka (zczytane piksele)
  //pozniej te wartosci nadac w wielkosci diva
  //przed wyswietleniem obrazka wczytac rozmiary X i Y, zapisac, nadac te wielkosci rozmiarom diva

 selectRoomFile() {
   
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


  
  //get coordinates of the mouse
  mouseMoved(event: MouseEvent) {
    let rect = (event.target as HTMLElement).getBoundingClientRect();

    this.cursorX = Math.round(event.clientX - rect.left);
    this.cursorY = Math.round(event.clientY - rect.top);

    if(this.cursorX < 0) this.cursorX = 0;
    if(this.cursorY < 0) this.cursorY = 0;

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
  openRemoveRoomSureDialog() {
    let removeRoomSureDialog:any = <any>document.getElementById("removeRoomSureDialog");
    removeRoomSureDialog.showModal();
  }

  closeRemoveRoomSureDialog() {
    let removeRoomSureDialog:any = <any>document.getElementById("removeRoomSureDialog");
    removeRoomSureDialog.close();
  }

  
  // remove a desk
  openRemoveDeskDialog() {
    let removeDeskDialog:any = <any>document.getElementById("removeDeskDialog");
    removeDeskDialog.showModal();
  }

  closeRemoveDeskDialog() {
    let removeDeskDialog:any = <any>document.getElementById("removeDeskDialog");
    removeDeskDialog.close();
  }

  // remove desk - are you sure?
  openRemoveDeskSureDialog() {
    let removeSureDialog:any = <any>document.getElementById("removeDeskSureDialog");
    removeSureDialog.showModal();
  }

  closeRemoveDeskSureDialog() {
    let removeDeskSureDialog:any = <any>document.getElementById("removeDeskSureDialog");
    removeDeskSureDialog.close();
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
