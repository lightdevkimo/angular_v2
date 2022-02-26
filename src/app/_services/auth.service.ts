import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { SignUpResponse, SignupData, LoginData,LoginResponse, User } from '../_models/user.model';
import { catchError, Subject, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  user = new Subject <User>();

  signup(user:SignupData){
    return this.http.post<SignUpResponse>('',
    {
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password
    }).pipe(
      catchError(this.handleError)
    )
  }
  login(data:LoginData){
    return this.http.post<LoginResponse>('',
    {
      email:data.email,
      password:data.password
    }).pipe(catchError(this.handleError))
  }

  private handleError(err:HttpErrorResponse){
    let errMsg = 'An unknown error occurred!'
        if(!err.error ){
          return throwError(()=> new Error(errMsg));
        }
        switch(err.error){
          
          default:
            errMsg = 'An error occurred!'

        }
        return throwError(()=>new Error(errMsg))
  }
}
