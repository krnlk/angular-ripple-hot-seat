import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RoomService{


  constructor(private http: HttpClient) {}

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${imageUrl}`, { responseType: 'blob' });
  }

  //gets the room image from the server
  getRoomImage(room_id: string)
  {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${room_id}`, {responseType: 'blob'})
  }

  //adds the room image to the server
  postRoomImage()
  {

  }


getRoom() {
}   

postRoom() {
}
  
}