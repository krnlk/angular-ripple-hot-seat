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

  // error message logic!
  // no username or password 
  registerErrorNoData: boolean = false;
  // if the username is already taken
  registerErrorUserTaken: boolean = false;
  // if the password is too short
  registerErrorPassShort: boolean = false;
  // if the passwords do not match
  registerErrorNoMatch: boolean = false;

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
      // disable an error message for non-matching passwords
      this.registerErrorNoMatch = false;

      this.http.postRegister(post).subscribe(
        (data) => {
          console.log('Registered succesfully.');
          console.log('Data: ');
          console.log(data);

          //po udanym zalogowaniu powinno przeniesc na strone z info o tym, ze wyslano maila?
          this.router.navigateByUrl('');
          this.app.showMatToolbar();
        },
        (error) => {
          console.log('Error: ');
          console.log(error);
          this.handleRegisterError(error);
        }
      )
    }

    // if the passwords do not match
    else {
      console.log('Your passwords do not match.');
      this.registerErrorNoMatch = true;
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

  handleRegisterError(error: any){
    if(error.error == "'username' and 'password' are required" ) this.registerErrorNoData = true;
    else this.registerErrorNoData = false;
    if(error.error == "'username' must be unique" ) this.registerErrorUserTaken = true;
    else this.registerErrorUserTaken = false;
    if(error.error == "'password' should be longer than 5 characters" ) this.registerErrorPassShort = true;
    else this.registerErrorPassShort = false;
  }
}
