"use strict";
import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './reservations.service';
import { Reservation } from "src/app/classes/reservation";
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

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
  //columns!: ["time", "officeName", "roomNumber", "deskNumber"];

  // stores list of reservations
  reservations: any;

  // attributes of a reservation
  id!: String;
  startTime!: String;

  //splitting startTime into date and time, also formats it
  startDay!: String;
  startHour!: String;

  endTime!: String;

  isTimeNull!: boolean;

  //splitting endTime into date and time, also formats it
  //endDay!: String = this.endTime.substr(8, 2)+this.endTime.substr(5, 2);
  //endDay: String = this.endTime.substr(0, 10);
  endhour!: String;

  deskId!: string;
  userId!: string;
  isPermanent!: boolean;

  // pagination
  pageEvent!: PageEvent;
  datasource!: null;
  pageIndex!: number;
  pageSize!: number;
  length!: number;

  // for mat column
  displayedColumnes = ['date', 'time', 'office', 'room', 'desk', 'isPermanent', 'operations'];

  constructor(public service: ReservationsService) {
  }

  // pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.doGetReservations();
  }

  // get all reservations of the logged user
  doGetReservations() {
    this.service.getReservations(localStorage.getItem('userId') || '{}').subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        // przekopiowanie rezerwacji do zmiennej lokalnej
        this.reservations = response;
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

  // removes a reservation
  doRemoveReservation(reservationId: string) {
    this.service.removeReservation(reservationId).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        // reload reservations
        this.doGetReservations();
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

}

