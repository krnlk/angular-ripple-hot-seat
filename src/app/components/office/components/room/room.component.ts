import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { RoomService } from './room.service';
import { formatDate } from '@angular/common';
import { BindingScope } from '@angular/compiler/src/render3/view/template';
import { Element } from '@angular/compiler';
import { OfficeComponent } from '../../office.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {

  imgUrl: string = '6276a11274ea2f51b016c7a8';

  rooms: any;

  imageToShow: any;
  isImageLoading!: boolean;
  DateCurrent: Date = new Date();
  dateNow!: any;
  timeNow!: any;

  //for queries
  Input1!: string;
  Input2!: string;
  Input3!: string;
  //roomId!: string;
  roomId: string = '6276a0a274ea2f51b016c7a6'; //bandaid
  positionX!: number;
  positionY!: number;
  number!: number;
  orientation!: string;

  //cursor's current coordinates on the image (?)
  cursorX!: number;
  cursorY!: number;
  pageX!: number;
  pageY!: number;

  //reservation input
  //startDay and startHour will be used to create a startTime, while endDay and endHour will be used to create a endTime
  startDay!: string;
  endDay!: string;
  startHour!: string;
  endHour!: string;
  userId: string = "62769a0b74ea2f51b016c7a4";
  isPermanent!: boolean;

  startTime!: string;
  endTime!: string;

  //file to be uploaded
  //selectedFile: File;

  // officeId that's shared from OfficeComponent
  @Input() public officeId!: any;

  // desk info
  // stores the desks of this room
  desks: any;
  deskId!: string;
  deskPositionX!: number;
  deskPositionY!: number;
  deskNumber!: number;
  deskOrientation!: string;
  deskIsFree!: boolean;
  deskBeaconId!: string;

  //subscription for updating officeId
  private _subscription: any;

  constructor(private service: RoomService, public _office: OfficeComponent, public http: HttpClient) {
    this.dateNow = formatDate(this.DateCurrent, 'dd-MM-yyyy', 'en-US', '+0530');
    //chyba two way data bindindg przy dacie

    /*
    console.log(this.officeId);
    this.officeId = sessionStorage.getItem('officeId');
    console.log(this.officeId);
    */

    //getting arguments from uri - giving up for now, swapping to sessionstorage
    
    this.officeId = _office.officeId;
    this._subscription = _office.officeIdChange.subscribe((value) => {
      this.officeId = value;
    })
    
    //this.officeId = _office.officeId;
    console.log(this._office.getOfficeId());
    console.log(this.officeId);
    
  }

  // mostly for testing - it shouldn't download all offices in the future, just one
  ngOnInit(): void {
    this.getImageFromService();
    this.doGetDesks();
  }

  // stolen from https://stackoverflow.com/questions/34714462/updating-variable-changes-in-components-from-a-service-with-angular2
  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }
 

  // return desks that exist for this particular room
  doGetDesks() {
    this.service.getDesks(this.roomId).subscribe(
      response=> {
        console.log('Response: ');
        console.log(response);
        this.desks = response;
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  //makes a reservation
  doMakeReservation(){
    let post = {
      //startTime: this.startTime,
      startTime: this.startDay+"T"+this.startHour,
      endTime: this.endDay+"T"+this.endHour,
      deskId: this.deskId,
      userId: this.userId,
      isPermanent: this.isPermanent
    };

    //do the passwords match?
    this.service.makeReservation(post).subscribe(
      (data) => {
        console.log('A reservation has been made succesfully.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while making a reservation: ');
        console.log(error);
      }
    )
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
  doGetRoomImage() {
    this.service.getRoomImage("6276a11274ea2f51b016c7a8").subscribe(
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


  //posts a desk to the database & then forces gets all the desks on the image again
  doAddDesk() {
    let post = {
      roomId: this.roomId,
      positionX: this.positionX,
      positionY: this.positionY,
      orientation: this.orientation,
      number: this.number
    };

    //do the passwords match?
    this.service.addDesk(post).subscribe(
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

  // update a desk's information
  doUpdateDesk() {
    let patch = {
      roomId: this.roomId,
      positionX: this.positionX,
      positionY: this.positionY,
      orientation: this.orientation,
      number: this.number
    };

    //do the passwords match?
    this.service.updateDesk(patch).subscribe(
      (data) => {
        console.log('Desk\'s data has been updated.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while updating the desk: ');
        console.log(error);
      }
    )
  }

  // delete a desk
  doDeleteDesk(deskId : any) {
    this.service.deleteDesk(deskId).subscribe(
      (data) => {
        console.log('A desk has been removed.');
        console.log('Data: ');
        console.log(data);

      },
      (error) => {
        console.log('Error while adding a desk: ');
        console.log(error);
      }
    )
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
    let addRoomDialog: any = <any>document.getElementById("addRoomDialog");
    addRoomDialog.showModal();
  }

  closeAddRoomDialog() {
    let addRoomDialog: any = <any>document.getElementById("addRoomDialog");
    addRoomDialog.close();
  }



  //get coordinates of the mouse
  mouseMoved(event: MouseEvent) {
    let rect = (event.target as HTMLElement).getBoundingClientRect();

    this.cursorX = Math.round(event.clientX - rect.left);
    this.cursorY = Math.round(event.clientY - rect.top);

    if (this.cursorX < 0) this.cursorX = 0;
    if (this.cursorY < 0) this.cursorY = 0;

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
  openRemoveRoomSureDialog() {
    let removeRoomSureDialog: any = <any>document.getElementById("removeRoomSureDialog");
    removeRoomSureDialog.showModal();
  }

  closeRemoveRoomSureDialog() {
    let removeRoomSureDialog: any = <any>document.getElementById("removeRoomSureDialog");
    removeRoomSureDialog.close();
  }


  // remove a desk
  openRemoveDeskDialog() {
    let removeDeskDialog: any = <any>document.getElementById("removeDeskDialog");
    removeDeskDialog.showModal();
  }

  closeRemoveDeskDialog() {
    let removeDeskDialog: any = <any>document.getElementById("removeDeskDialog");
    removeDeskDialog.close();
  }

  // remove desk - are you sure?
  openRemoveDeskSureDialog() {
    let removeSureDialog: any = <any>document.getElementById("removeDeskSureDialog");
    removeSureDialog.showModal();
  }

  closeRemoveDeskSureDialog() {
    let removeDeskSureDialog: any = <any>document.getElementById("removeDeskSureDialog");
    removeDeskSureDialog.close();
  }

  // edit desk with that id
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

  openReservationDialog() {
    let reservationDialog: any = <any>document.getElementById("reservationDialog");
    reservationDialog.showModal();
  }

  closeReservationDialog() {
    let reservationDialog: any = <any>document.getElementById("reservationDialog");
    reservationDialog.close();
  }

  //changes current deskId
  currentDeskId(desk: any) {
    this.deskId = desk.id;
    this.deskPositionX = desk.number;
    this.deskPositionY = desk.number;
    this.deskNumber = desk.number;
    this.deskOrientation = desk.string;
    this.deskIsFree = desk.boolean;
    this.deskBeaconId = desk.string;
  }
  

  title = 'jakakolwiek-nazwa';
}
