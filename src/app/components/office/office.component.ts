import { Component } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'office-component',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent{
  isSelected = true;
  onListSelectionChange(ob: MatSelectionListChange) {
     console.log("Selected Item: " + ob.source.selectedOptions.selected.length);
  }
  techList = [
    {id: 101, lang: 'Stanowisko numer 1'},
    {id: 102, lang: 'Stanowisko numer 2'},
    {id: 103, lang: 'Stanowisko numer 3'},
    {id: 104, lang: 'Stanowisko numer 4'},
    {id: 105, lang: 'Stanowisko numer 5'},
    {id: 106, lang: 'Stanowisko numer 6'},
    {id: 107, lang: 'Stanowisko numer 7'},
    {id: 108, lang: 'Stanowisko numer 8'},
    {id: 109, lang: 'Stanowisko numer 9'}
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

