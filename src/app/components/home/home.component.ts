import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openMyDialog() {
    let myDialog:any = <any>document.getElementById("myDialog");
    myDialog.showModal();
  }

  closeMyDialog() {
    let myDialog:any = <any>document.getElementById("myDialog");
    myDialog.close();
  }
}
