import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewComponentComponent } from './components/new-component/new-component.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
//{ path: '', redirectTo:'/', pathMatch: 'full' }, 
{ path: '', component: HomeComponent },
{ path: 'office', component: NewComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
