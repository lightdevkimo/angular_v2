import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }

  isLogin =false;
  current='';
  role=2
  changeActive(active:string){
    this.current=active;
  }

  ngOnInit(): void {

    if(localStorage.getItem("token")){
      this.isLogin=true;
    }

    // this.auth.checktoken(true);
    // this.isLogin=this.token.isLogin;
    this.auth.changeLogin.subscribe(
      res=>{
        this.isLogin = res;
      }
    )
    console.log(this.auth.isLogin);
  }
  destorySession(){
    //this.isLogin=true
    this.auth.checktoken(false);
    this.router.navigateByUrl('/home');
    // this.isLogin=false;

  }
}


