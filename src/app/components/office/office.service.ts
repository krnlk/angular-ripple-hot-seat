// import {Injectable} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
// import {Router} from "@angular/router";
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class OfficeService{
//   private apiUrl = 'login';
//   constructor(private http: HttpClient, private router: Router) {}
//
//   getLogin(username: string, password: string) {
//     console.log("Trying to log in...");
//     //return this.http.get(`http://localhost:8080/login?username=${username}&password=${password}`, {responseType: 'text'})
//     return this.http.get(`https://ripple-hot-seat-backend-app.herokuapp.com/login?username=${username}&password=${password}`, {responseType: 'text'})
//     //return this.http.get(`http://localhost:8080/login?username=${username}&password=${password}`, {responseType: 'text'})
//   }
//
//   logoutUser() {
//     localStorage.removeItem('token')
//     this.router.navigate(['/'])
//   }
//
//   getToken() {
//     // napisane w taki sposob, aby tymczasowo naprawic pewien blad przy logowaniu i autoryzacji
//     return localStorage.getItem('token')
//   }
//
//   isLoggedIn(){
//     // https://www.youtube.com/watch?v=7L80dKtfHe0&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=25
//     // wedlug tego tutoriala, takie podwojne zaprzeczenie oznacza, ze metoda zwroci albo true, albo false (w zaleznosci od tego, czy ktos jest zalogowany)
//     return !!localStorage.getItem('token')
//   }
// }
