import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})


export class RegisterService {
    constructor(private http: HttpClient) { }

    postRegister(post: { username: string; password: string; isAdmin: string; }) {

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'text' as const
        }

        console.log("Creating a new account...");
        return this.http.post(`https://ripple-hot-seat-backend-app.herokuapp.com/users/save`, JSON.stringify(post), httpOptions)
    }
}