import { Component } from '@angular/core';
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
  /*
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
  */
  title = 'jakakolwiek-nazwa';

  // to jest bardzo ciekawe, bo wedlug tutoriala: https://www.youtube.com/watch?v=7L80dKtfHe0&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=25
  // _loginService powinno byc prywatne, ale wtedy w pliku app.component.html jest narzekanie, ze atrybut jest prywatny i nie ma jak sie do niego dostac
  // moze to wynikac z roznej wersji angulara? (tutorial z 2018 roku)
  constructor(public _loginService: LoginService) {}

  
}

