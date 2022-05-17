"use strict";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

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
