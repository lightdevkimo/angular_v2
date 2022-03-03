import { Component, OnInit } from '@angular/core';
import { user_info } from '../_models/user.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
// role='admin'
  constructor() { }
  user_info:user_info

  ngOnInit(): void {
    this.user_info = JSON.parse(localStorage.getItem('user_info'));
    console.log(this.user_info);

  }

}
