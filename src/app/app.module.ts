import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { OfficeComponent } from './components/office/office.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { RestapiService } from './restapi.service';
import { LoginService } from './components/login/login.service';
import { ReservationsService } from './components/reservations/reservations.service';
import { OfficeService } from './components/office/office.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    OfficeComponent,
    HomeComponent,
    ReservationsComponent,
    AboutusComponent,
    FaqComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [RestapiService, LoginService, ReservationsService, OfficeService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
