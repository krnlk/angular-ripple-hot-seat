import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RoomService {


  constructor(private http: HttpClient) { }

  makeReservation(post: { startTime: string; endTime: string; deskId: string; userId: string; isPermanent: boolean }) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }

    console.log("Trying to make a reservation...");
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/reservations/save`, JSON.stringify(post), httpOptions)
  }

  getImage(imageUrl: string): Observable<Blob> {
    //return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${room_id}`, { responseType: 'blob' })
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/62b1bc6d8f9ca074a2b9aa66`, { responseType: 'blob' })
  }

  //gets the room image from the server
  getRoomImage(room_id: string) {
    //return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${room_id}`, { responseType: 'blob' })
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/62b1bc6d8f9ca074a2b9aa66`, { responseType: 'blob' })
  }

  //adds the room image to the server
  postRoomImage() {

  }


  getRoomData(roomId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/byId/${roomId}`)
  }

  uploadRoomFile(image_id: string) {
    return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/image/${image_id}`, { responseType: 'blob' })
  }

  removeRoom(roomId: string) {
    return this.http.delete(`https://ripple-hot-seat-backend-app.herokuapp.com/rooms/delete/${roomId}`, {responseType: 'text'})
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

  // update this desk's data
  updateDesk(patch: { roomId: string; positionX: number; positionY: number; orientation: string; number: number }, deskId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as const
    }
    
    return this.http.patch(`https://ripple-hot-seat-backend-app.herokuapp.com/desks/update/${deskId}`, JSON.stringify(patch), httpOptions)
  }

  // remove this desk
  deleteDesk(roomId: string) {
    return this.http.delete(`https://ripple-hot-seat-backend-app.herokuapp.com/desks/delete/${roomId}`, {responseType: 'text'})
  }

  // get all the desks of that room
  getDesks(roomId: string) {
    return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/desks/byRoomId/${roomId}`)
  }

}