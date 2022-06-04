import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RoomService {


  constructor(private http: HttpClient) { }

  makeReservation(post: {startTime: string; endTime: string; deskId: string; userId: string; isPermanent: boolean}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    console.log("Trying to make a reservation...");
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/reservations/save`, JSON.stringify(post), httpOptions)
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${imageUrl}`, { responseType: 'blob' });
  }

  //gets the room image from the server
  getRoomImage(room_id: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${room_id}`, { responseType: 'blob' })
  }

  //adds the room image to the server
  postRoomImage() {

  }


  getRoom() {
  }

  uploadRoomFile(image_id: string) {
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${image_id}`, { responseType: 'blob' })
  }

  //adds a desk to the server
  addDesk(post: { roomId: string; positionX: number; positionY: number; orientation: string; number: number }) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    console.log("Trying to add a new desk...");
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/desks/save`, JSON.stringify(post), httpOptions)
  }

  // get all the desks of that room
  getDesks(roomId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/desk/byRoomId/`)
  }
}