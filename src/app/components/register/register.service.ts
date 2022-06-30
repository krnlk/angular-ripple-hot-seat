import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

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

    // checks if logged in
    isLoggedIn() {
        // https://www.youtube.com/watch?v=7L80dKtfHe0&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=25
        // wedlug tego tutoriala, takie podwojne zaprzeczenie oznacza, ze metoda zwroci albo true, albo false (w zaleznosci od tego, czy ktos jest zalogowany)
        return !!localStorage.getItem('token')
    }
}