import { Component } from '@angular/core';
import { ICountry } from '../assets/country.model';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSelected = true;
  onListSelectionChange(ob: MatSelectionListChange) {
     console.log("Selected Item: " + ob.source.selectedOptions.selected.length);
  }
  techList = [
    {id: 101, lang: 'Java'},
    {id: 102, lang: 'Angular'},
    {id: 103, lang: 'Hibernate'}
  ];
  constructor(private formBuilder: FormBuilder) { }
  techForm = this.formBuilder.group({
    selectedTech: ''
  });
  onFormSubmit() {
    //console.log(this.techForm.get('selectedTech').value);
  }

  title = 'jakakolwiek-nazwa';
}

