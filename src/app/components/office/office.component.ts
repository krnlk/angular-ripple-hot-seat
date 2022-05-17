"use strict";
import { Component } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { OfficeService } from './office.service';

@Component({
  selector: 'office-component',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent{
  // skradzione z https://www.youtube.com/watch?v=Oz6zuhjrMi4


 // constructor(private httpClient: HttpClient) { }
  constructor(public http: HttpClient) {}
  /*
  getRoom(){
    return this.httpClient.get('https://ripple-hot-seat-backend-app.herokuapp.com/office/rooms');
  }
  */

  rooms: any;

  ngOnInit(): void{
    this.http.get("https://ripple-hot-seat-backend-app.herokuapp.com/login?username=login&password=password", {responseType: 'text'})
    .subscribe(
      responseLogin => {
        let token = responseLogin;
        this.http.get("https://ripple-hot-seat-backend-app.herokuapp.com/rooms", {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '+token
          })
        }).subscribe(
          responseRoom => {
            console.log('responseRoom ');
            console.log(responseRoom);
          },
          errorRoom => {
            console.log('errorRoom ');
            console.log(errorRoom);
          } 
        )
      }
    );
    

    /*
    this.officeService.getRoom().subscribe(data => {
      this.rooms = data;
      
    })
    */
  }

  /*
  isSelected = true;
  onListSelectionChange(ob: MatSelectionListChange) {
     console.log("Selected Item: " + ob.source.selectedOptions.selected.length);
  }

  constructor(private formBuilder: FormBuilder) { }
  techForm = this.formBuilder.group({
    selectedTech: ''
  });
  onFormSubmit() {
    //console.log(this.techForm.get('selectedTech').value);
  }
*/
  title = 'jakakolwiek-nazwa';
}

