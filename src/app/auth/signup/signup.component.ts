import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { SignupData } from 'src/app/_models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  signupData:SignupData
  error:string=null
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
signup(data){
    this.http.post('http://127.0.0.1:8000/api/register', data).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    });
  }


}
