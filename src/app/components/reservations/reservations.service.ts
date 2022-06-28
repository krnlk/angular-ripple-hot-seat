"use strict";
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
    providedIn: 'root'
})

export class ReservationsService {
    private apiUrl = 'reservations';
    constructor(private http: HttpClient) { }

    //na razie kazdy powinien miec do tego dostep (bez jwt i autoryzacji), zeby testowac

    getReservations(userId: string) {
        return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/reservations/byUserId/${userId}`)
    }
}
