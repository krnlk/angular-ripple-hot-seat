"use strict";
export class Reservation {
    id: String;
    startTime: String;
    endTime: String;
    deskId: String;
    userId: String;

    constructor(id: string, startTime: string, endTime: string, deskId: string, userId: string){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deskId = deskId;
        this.userId = userId;
    }
  }
