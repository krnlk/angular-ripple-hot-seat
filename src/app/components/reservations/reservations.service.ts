import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})

export class ReservationsService{
    private apiUrl = 'reservations';
    constructor(private http: HttpClient) {}

//na razie kazdy powinien miec do tego dostep (bez jwt i autoryzacji), zeby testowac

getReservations() {
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
})
    };
    console.log("Getting reservations...");
    //return this.http.get<any>(`http://localhost:8080/reservations`, httpOptions)
    return this.http.get<any>(`https://ripple-hot-seat-backend-app.herokuapp.com/reservations`)
}

/*
getReservations() {
    console.log("Getting reservations...");
    this.http.get<any>(`http://localhost:8080/reservations`)
        .subscribe(
            response =>{
                console.log('Response: ');
                console.log(response);
            },
            error =>{
                console.log('Error');
                console.log(error);
        }
    )
}   
*/
}