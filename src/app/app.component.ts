import { Component, HostListener } from '@angular/core';
import { ICountry } from '../assets/country.model';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Clear the local storage whenever the browser is closed - things like username, isAdmin, token etc
  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event: any){
      localStorage.clear();
  }

  title = 'jakakolwiek-nazwa';

  //username = localStorage.getItem('username')

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

  
}

