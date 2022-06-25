"use strict";
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoginService } from './components/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
/*
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
  }
  */
  private token: string;

  constructor() {
      this.token = localStorage.getItem('token')||'{}'; //fix z https://www.infinetsoft.com/Post/Argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string-n-Type-null-is-not-assignable-to-type-string/3092?msclkid=43a67405d08511ec83e96f00fefd8ded#.YnqgI4zP1aQ
      //inaczej czepialo sie typescriptu
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.token = localStorage.getItem('token')||'{}'; //fix z https://www.infinetsoft.com/Post/Argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string-n-Type-null-is-not-assignable-to-type-string/3092?msclkid=43a67405d08511ec83e96f00fefd8ded#.YnqgI4zP1aQ

      if (this.token != '{}') {
          const modReq = req.clone({
              setHeaders: {
                  'Authorization': "Bearer " + this.token
              }
          });
          return next.handle(modReq);
      }
      return next.handle(req);
  }


}
