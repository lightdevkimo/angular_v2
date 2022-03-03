import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  isLogin=true
  constructor() { }
  destorySession(){
    this.isLogin=false
  }
  ngOnInit(): void {
  }

}
