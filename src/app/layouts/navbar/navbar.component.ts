import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin =true;
  current='';
role=2
  changeActive(active:string){
    this.current=active;
  }
  constructor() { }

  ngOnInit(): void {
  }
  destorySession(){
    this.isLogin=false
  }
}
