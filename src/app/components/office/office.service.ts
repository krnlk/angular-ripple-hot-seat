import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class OfficeService {


  constructor(private http: HttpClient) { }


  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);

    //change later
    return this.http.post<Response>('https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/62769a0b74ea2f51b016c7a5', formData);
  }

  getImage(levelId: string): Observable<Blob> {
    //return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/levels/image/${levelId}`, { responseType: 'blob' });
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/levels/image/62b1bc6d8f9ca074a2b9aa64`, { responseType: 'blob' });
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

  addRoom(post: { levelId: string, number: number; positionX: number; positionY: number;}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    console.log("Trying to add a new room...");
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/save`, JSON.stringify(post), httpOptions)
  }

  // removes a room
  removeRoom(roomId: string) {
    return this.http.delete(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/delete/${roomId}`)
  }

  //returns all existing office names
  getOffices() {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/offices`)
  }

   // adds a new office
   addOffice(post: { name: string;}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    return this.http.post('https://ripple-hot-seat-backend-app.herokuapp.com/offices/save', JSON.stringify(post), httpOptions)
  }

  // removes an office
  removeOffice(officeId: string) {
    return this.http.delete(`https://ripple-hot-seat-backend-app.herokuapp.com/offices/delete/${officeId}`)
  }

  //returns all existing levels in that office
  getLevels(officeId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/levels/byOfficeId/${officeId}`)
  }

   // adds a new level in an office
   addLevel( post: {officeId: string; number: number;}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    return this.http.post('https://ripple-hot-seat-backend-app.herokuapp.com/levels/save', JSON.stringify(post), httpOptions)
  }

  // removes a level 
  removeLevel(levelId: string) {
    return this.http.delete(`https://ripple-hot-seat-backend-app.herokuapp.com/levels/delete/${levelId}`)
  }

  // adds a dot on top of the background image
  addDot(levelId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/byLevelId/${levelId}`);
  }

  // searches all rooms on this level and returns the percentages (marked by dot colour) of seats available in said timeframe
  search(levelId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/levels/percentage/${levelId}`);
  }
}
