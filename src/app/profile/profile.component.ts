import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
// role='admin'
  constructor() { }
  user_info={
    "id": 0,
    "name": "",
    "role": 1,
    "email": "",
    "gender": ""
}
  ngOnInit(): void {
    this.user_info = JSON.parse(localStorage.getItem('user_info'));
    console.log(this.user_info);

  }

}
