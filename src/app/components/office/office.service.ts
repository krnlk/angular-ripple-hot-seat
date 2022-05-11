import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})

export class OfficeService{
    private apiUrl = 'reservations';
    constructor(private httpClient: HttpClient) {}

//na razie kazdy powinien miec do tego dostep (bez jwt i autoryzacji), zeby testowac

getRoom() {
    return this.httpClient.get('https://ripple-hot-seat-backend-app.herokuapp.com/rooms')
}   

postRoom() {
}
  
}