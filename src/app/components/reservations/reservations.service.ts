import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { from } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})

export class ReservationsService{
    private apiUrl = 'reservations';
    constructor(private http: HttpClient, private _loginService: LoginService) {}

//na razie kazdy powinien miec do tego dostep (bez jwt i autoryzacji), zeby testowac
//https://stackoverflow.com/questions/63167450/how-to-add-token-in-http-request-angular?msclkid=2ec98e27d08611ecb4bb2213df224969
//https://stackoverflow.com/questions/59356703/api-passing-bearer-token-to-get-http-url?msclkid=3c598efbd08311ecbc63dbf59ac26015
//https://stackoverflow.com/questions/35091524/spring-cors-no-access-control-allow-origin-header-is-present?msclkid=aa462d70d08d11ecac678ac7864e48ef
//https://www.youtube.com/watch?v=PovQ6aUeRgg

getReservations() {
    console.log("Getting reservations...");
    //return this.http.get<any>(`http://localhost:8080/reservations`, httpOptions)
    return this.http.get<any>(`https://ripple-hot-seat-backend-app.herokuapp.com/reservations`)
}   


/*
public getReservations = (route: string) => {
    return from(
      this._loginService.getAccessToken()
      .then((token: any) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get('https://ripple-hot-seat-backend-app.herokuapp.com/reservations', { headers: headers }).toPromise();
      })
    );
  }

postReservations() {
}
*/
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