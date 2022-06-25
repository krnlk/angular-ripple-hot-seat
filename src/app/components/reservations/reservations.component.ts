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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  reservations: any;

  displayColumns: string[] = ['data', 'time', 'office', 'room', 'desk', 'is permanent?'];
  pnDisabled=true;
  pgIndex=2;

  // attributes of a reservation
  id!: String;
  startTime!: String;

  //splitting startTime into date and time, also formats it
  startDay!: String;
  startHour!: String;

  endTime!: String;

  //splitting endTime into date and time, also formats it
  //endDay!: String = this.endTime.substr(8, 2)+this.endTime.substr(5, 2);
  //endDay: String = this.endTime.substr(0, 10);
  endhour!: String;

  deskId!: String;
  userId!: String;
  isPermanent!: boolean;

  // pagination
  pageEvent!: PageEvent;
  datasource!: null;
  pageIndex!: number;
  pageSize!: number;
  length!: number;

  constructor(public service: ReservationsService) {
  }

  ngOnInit() {

    this.service.getReservations(localStorage.getItem('userId') || '{}').subscribe(
      response => {
        console.log("Reservations are being properly shown.");
        console.log('Response: ');
        console.log(response);

        // przekopiowanie rezerwacji do zmiennej lokalnej
        //rezygnujemy z paginacji -> scrol
        this.reservations = response;
        this.reservations.paginator = this.paginator;
      },
      error => {
        console.log("Error while loading reservations.");
        console.log('Error: ');
        console.log(error);
      }
    )
    //this.getServerData();

  }
  /*
  public getServerData(event?:PageEvent){
    this.service.getReservations(event).subscribe(
      response =>{
        if(response.error) {
          // handle error
        } else {
          this.datasource = response.data;
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.length = response.length;
        }
      },
      error =>{
        // handle error
      }
    );
    return event;
  }*/

  // ???????????
  doGetReservations() {
    console.log("Reservations are being properly shown.");
    //console.log(this.reservations);
    this.service.getReservations("a");
  }

  onChangePage(pe: PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }
}

