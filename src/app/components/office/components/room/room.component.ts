import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { RoomService } from './room.service';
import { formatDate } from '@angular/common';
import { OfficeComponent } from '../../office.component';
import { LoginService } from '../../../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {

  // bandaid
  //imgUrl: string = '6276a11274ea2f51b016c7a8';
  imgUrl!: string;

  rooms: any;
  // info about the room
  roomInfo: any;
  officeName!: string;
  roomNumber!: number;


  imageToShow: any;
  isImageLoading!: boolean;
  imageLoaded!: boolean;

  DateCurrent: Date = new Date();
  // parameters for date & time (when checking reservations and reserving)
  dateFrom!: any;
  dateUntil!: any;
  timeFrom!: any;
  timeUntil!: any;

  //for queries
  Input1!: string;
  Input2!: string;
  Input3!: string;


  roomId!: string;
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

  // subscription for updating officeId
  private _subscription: any;

  constructor(private service: RoomService, public _login: LoginService, public _office: OfficeComponent, public route: ActivatedRoute, public router: Router, public http: HttpClient) {
    this.dateFrom = formatDate(this.DateCurrent, 'yyyy-MM-dd', 'en-US', '+0530');
    this.dateUntil = this.dateFrom;
    this.timeFrom = formatDate(this.DateCurrent, 'hh:mm', 'en-US', '+0530');
    this.timeUntil = '17:00';
    // chyba two way data bindindg przy dacie

    this.officeId = sessionStorage.getItem('officeId');

    // getting arguments from uri - giving up for now, swapping to sessionstorage

    this.officeId = _office.officeId;
    this._subscription = _office.officeIdChange.subscribe((value) => {
      this.officeId = value;
    })
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['roomId'];
    this.doGetRoomData();
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
    // in case this method has been called before - redrawing
    if (this.desks != undefined) {
      if (this.desks.length === 0) {
        // turning an array into a null array
        this.desks.length = 0;
      }
    }

    this.service.getDesks(this.roomId).subscribe(
      response => {
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

  // fill reservation's initial info
  initialReservationInfo() {
    this.startDay = this.dateFrom;
    this.endDay = this.dateUntil;
    this.startHour = this.timeFrom;
    this.endHour = this.timeUntil;
  }

  // makes a reservation
  doMakeReservation() {
    let post = {
      //startTime: this.startTime,
      startTime: this.startDay + "T" + this.startHour,
      endTime: this.endDay + "T" + this.endHour,
      deskId: this.deskId,
      userId: localStorage.getItem('userId') || '{}',
      isPermanent: this.isPermanent
    };

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

  // do what you want cuz being a pirate is free, you are a pirate!
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

  // add a room image
  doPostRoomImage() {

  }

  // get info about the room
  doGetRoomData() {
    this.service.getRoomData(this.roomId).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        this.roomInfo = response;

        //this.officeName = this.roomInfo.officeName;
        //this.roomNumber = this.roomInfo.number;
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  // delete a desk
  doRemoveRoom(roomId: any) {
    this.service.removeRoom(roomId).subscribe(
      (data) => {
        console.log('The room has been removed.');
        // reroute back to office
        this.router.navigateByUrl('/office');
      },
      (error) => {
        console.log('Error while removing the room: ');
        console.log(error);
      }
    )
  }

  // posts a desk to the database & then forces gets all the desks on the image again
  doAddDesk() {
    let post = {
      roomId: this.roomId,
      positionX: this.positionX,
      positionY: this.positionY,
      orientation: this.orientation,
      number: this.number
    };

    this.service.addDesk(post).subscribe(
      (data) => {
        console.log('A desk has been added.');
        console.log('Data: ');
        console.log(data);
        // add the new desk
        this.doGetDesks();
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
      positionX: this.deskPositionX,
      positionY: this.deskPositionY,
      orientation: this.orientation,
      number: this.deskNumber
    };

    this.service.updateDesk(patch, this.deskId).subscribe(
      (data) => {
        console.log('Desk\'s data has been updated.');
        console.log('Data: ');
        console.log(data);

        // delete the modified desk from its old spot

        // draw the modified desk in its new spot
        this.doGetDesks();

      },
      (error) => {
        console.log('Error while updating the desk: ');
        console.log(error);
      }
    )
  }

  // delete a desk
  doDeleteDesk(deskId: any) {
    this.service.deleteDesk(deskId).subscribe(
      (data) => {
        console.log('A desk has been removed.');
        //delete the modified desk from its old spot
        this.doGetDesks();
      },
      (error) => {
        console.log('Error while deleting a desk: ');
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

  // go back to office page
  routeBack() {
    this.router.navigateByUrl('/office');
  }

  // change it later
  doSearch() {
    this.service.search(this.roomId).subscribe(
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

  // open desk with that id
  openUserDeskDialog() {
    let userDeskDialog: any = <any>document.getElementById("userDeskDialog");
    userDeskDialog.showModal();
  }

  closeUserDeskDialog() {
    let userDeskDialog: any = <any>document.getElementById("userDeskDialog");
    userDeskDialog.close();
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

  //gets currently clicked on desk's info
  currentDeskId(desk: any) {
    this.deskId = desk.id;
    this.deskPositionX = desk.positionX;
    this.deskPositionY = desk.positionY;
    this.deskNumber = desk.number;
    this.deskOrientation = desk.orientation;
    this.deskIsFree = desk.isFree;
    this.deskBeaconId = desk.beaconId;
  }


  title = 'jakakolwiek-nazwa';
}
