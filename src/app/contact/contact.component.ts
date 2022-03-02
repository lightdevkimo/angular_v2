import { Component, OnInit } from '@angular/core';
import { contact } from '../_models/user.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  error: string = '';

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit(): void {
  }

  Sent(postData: contact) {
    // Send Http request
    console.log(postData);
    this.data.Sent(postData).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);

      for (const e in error.error.errors) {
        this.error += error.error.errors[e];
      }

    });


  }

}
