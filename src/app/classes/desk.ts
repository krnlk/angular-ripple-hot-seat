"use strict";
export class Desk {
    id: String;
    startTime: String;
    endTime: String;
    deskId: String;
    userId: String;
    number: number;

    constructor(id: string, startTime: string, endTime: string, deskId: string, userId: string, number: number){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deskId = deskId;
        this.userId = userId;
        this.number = number;
    }
  }
