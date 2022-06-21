"use strict";
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username!: string
  email!: string
  password!: string
  password2!: string

  constructor(public app: AppComponent, public http: RegisterService, public router: Router) 
  { 
    // unlike in appservice, this does work in constructor - might cause issues later down the line
    this.app.hideMatToolbar();
  }

  ngOnInit(): void {
  }

  doRegister() {
    let post = {
      username: this.username + "@comarch.com",
      password: this.password,
      isAdmin: 'false'
    };

    //do the passwords match?
    if (this.password == this.password2) {
      this.http.postRegister(post).subscribe(
        (data) => {
          console.log('Registered succesfully.');
          console.log('Data: ');
          console.log(data);

          //po udanym zalogowaniu powinno przeniesc na strone z info o tym, ze wyslano maila?
          this.router.navigateByUrl('');
        },
        (error) => {
          console.log('Error: ');
          console.log(error);
        }
      )
    }

    else {
      console.log('Your passwords do not match.');
    }
  }

  // pressing enter is the same as clicking register key
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.doRegister();
    }
  }
  
  /*
  showMatToolbar() {
    let matToolbar: any = <any>document.getElementById("matToolbar");
    matToolbar.classList.remove("hidden");
  }*/

}
