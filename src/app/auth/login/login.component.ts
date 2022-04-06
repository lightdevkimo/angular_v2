import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from 'src/app/_models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:string='';

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login(data) {

    this.http.post('http://127.0.0.1:8000/api/login', data.value).subscribe(res => {
      console.log(res);
      localStorage.setItem("token", res['token']);
      localStorage.setItem("role", res['role']);
      localStorage.setItem("salt", res['salt']);
      localStorage.setItem("user_info",JSON.stringify(res['data']));
      this.auth.checktoken(true);
      if(res['role']==0){
        this.router.navigateByUrl('/admin-panal/statics');
      }else if(res['role']==2){
        this.router.navigateByUrl('/apartment/add');
      }else{
        this.router.navigateByUrl('/find');
      }
      setTimeout(()=>{
        location.reload();
      },1)
    }, err => {
      this.error ='';
      //for (const e in err.error.errors) {
        this.error=err.error.errors;
      //}

    });
  }



}
