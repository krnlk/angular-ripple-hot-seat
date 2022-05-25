import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class OfficeService{


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

  /*
    private apiUrl = 'reservations';

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${btoa(AuthService.getToken())}`)
    }
    
    this.http.get(url, header)

    constructor(private httpClient: HttpClient) {}
    */

//na razie kazdy powinien miec do tego dostep (bez jwt i autoryzacji), zeby testowac
/*
const headers= new HttpHeaders()
.set('content-type', 'application/json')
.set('Access-Control-Allow-Origin', '*');
*/

//sprobowa doklejanie tokenow

/*
getRoom() {
  return this.httpClient.get('https://ripple-hot-seat-backend-app.herokuapp.com/rooms')
}*/



getRoom() {

  

  /*
  let header = new Headers({ 'Authorization': `Bearer ${token}` });
  const options = new RequestOptions({
    headers: header,
  });
    return this.httpClient.get('https://ripple-hot-seat-backend-app.herokuapp.com/rooms', options)
  */
}   

postRoom() {
}
  
}