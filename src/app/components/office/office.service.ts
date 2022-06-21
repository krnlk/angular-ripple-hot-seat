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

  addRoom(post: { number: number; level: number; officeId: string; positionX: number; positionY: number;}) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    console.log("Trying to add a new room...");
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/save`, JSON.stringify(post), httpOptions)
  }

  //returns all existing office names
  getOffices() {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/offices`)
  }

  //returns all existing levels in that office
  getLevels() {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/`)
  }

  //adds a dot on top of the background image
  addDot(officeId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/byOfficeId/${officeId}`);
  }

}
