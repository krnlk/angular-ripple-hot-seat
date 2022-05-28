"use strict";

//need to fix it later - temporary
export class Reservation {
    id: String;
    startTime: String;
    endTime: String;
    time: String;
    deskId: String;
    userId: String;
    office: String;
    roomNumber: number;
    deskNumber: number;

    constructor(id: string, startTime: string, endTime: string, time: string, deskId: string, userId: string, office: string, roomNumber: number, deskNumber: number){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.time = time;
        this.deskId = deskId;
        this.userId = userId;
        this.office = office;
        this.roomNumber = roomNumber;
        this.deskNumber = deskNumber;
    }
  }
