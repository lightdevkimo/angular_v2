import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss']
})
export class StaticsComponent implements OnInit {
  isLogin=true
  constructor() { }

  ngOnInit(): void {
  }
  destorySession(){
    this.isLogin=false
  }
}
