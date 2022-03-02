import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { }
  isLogin=true
  ngOnInit(): void {
  }
  destorySession(){
    this.isLogin=false
  }
}
