import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from 'src/app/_models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
login(data){
    console.log(data.value);
    this.http.post('http://127.0.0.1:8000/api/login', data.value).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
