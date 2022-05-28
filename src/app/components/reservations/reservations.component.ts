"use strict";
import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './reservations.service';
import { Reservation } from "src/app/classes/reservation";
import { NgForm } from '@angular/forms';

/*
interface reservation {
  id: String,
  startTime: String,
  endTime: String,
  deskId: String,
  userId: String;
}
*/

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  columns!: ["time", "officeName", "roomNumber", "deskNumber"];

  reservations: Reservation[] = [];

  /*
  id!: String;
  startTime!: String;
  endTime!: String;
  deskId!: String;
  userId!: String;
  */

  constructor(public service:ReservationsService){

  }


  ngOnInit() {
    //testing css
    /*
    console.log("Reservations are being properly shown.");
    //console.log(this.reservations);
    //this.service.getReservations();

    this.service.getReservations().subscribe(
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

  doGetReservations(){
    console.log("Reservations are being properly shown.");
    //console.log(this.reservations);
    this.service.getReservations();
    }
*/
}}
