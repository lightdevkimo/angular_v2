import { apart } from 'src/app/_models/user.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit {

  url = "http://127.0.0.1:8000/storage/images/"
  apart: apart
  id: string
  constructor(private activeRouter: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.activeRouter.snapshot.params)
    this.id = this.activeRouter.snapshot.params['id']
    console.log(this.id)

    this.showApart()
  }

  showApart() {
    this.http.get('http://127.0.0.1:8000/api/apartements/' + this.id).subscribe(data => {

      //for (let i = 0; i < data['data'].length; i++) {
      // this.apart[i] = (data['data'][i]);
      console.log(data);
      this.apart = data['data'];
      console.log(this.apart);

      // }
    });

  }


}
