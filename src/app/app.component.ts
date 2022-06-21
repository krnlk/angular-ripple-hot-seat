import { Component, HostListener } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username!: string;

  // Clear the local storage whenever the browser is closed - things like username, isAdmin, token etc
  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event: any){
      localStorage.clear();
  }

  title = 'jakakolwiek-nazwa';

  //username = localStorage.getItem('username')
  ngOnInit(): void {
    // doesn't work in constructor
    this.showMatToolbar();
  }

  constructor(public _loginService: LoginService) {
  }

  hideMatToolbar(){
    let matToolbar:any = <any>document.getElementById("matToolbar");
    matToolbar.classList.add("hidden");
  }

 showMatToolbar(){
    let matToolbar:any = <any>document.getElementById("matToolbar");
    matToolbar.classList.remove("hidden");
  }

  doGetUserInfo () {
    this._loginService.getUserInfo(this.username).subscribe(
      response => {
        console.log('Response: ');
        console.log(response);

        // user info
        //localStorage.setItem('userId', response.id);
        //localStorage.setItem('isAdmin', response);
      },
      error => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }
  
}

