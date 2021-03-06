"use strict";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OfficeComponent } from './components/office/office.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RoomComponent } from './components/office/components/room/room.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'office', component: OfficeComponent },
{ path: 'office/room/:roomId', component: RoomComponent },
{ path: 'reservations', component: ReservationsComponent },
{ path: 'aboutus', component: AboutusComponent },
{ path: 'faq', component: FaqComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'account', component: AccountComponent },
{ path: 'reset-password', component: ResetPasswordComponent },
{ path: '**', redirectTo:'', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
