import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  postData = {
    username: '${username}'
  }

  constructor(public http: RegisterService, public router:Router) { }

  ngOnInit(): void {
  }

  doRegister() {
    //this.http.get<any>(`http://localhost:8080/login?username=${this.username}&password=${this.password}`)

    let post = {
      username: 'Ron',
      password: 'Weasley',
      isAdmin: 'false'
    };

    this.http.postRegister(post).subscribe(
      (data: any) => {
        console.log('Registered succesfully.');
        console.log('Data: ');
        console.log(data);

        //po udanym zalogowaniu powinno przeniesc na strone z info o tym, ze wyslano maila?
        this.router.navigateByUrl('');
      },
      (error: any) => {
        console.log('Error: ');
        console.log(error);
      }
    )
  }

}
