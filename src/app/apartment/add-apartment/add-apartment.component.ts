import { img } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apart } from 'src/app/_models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-addApartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.scss']
})
export class AddApartmentComponent implements OnInit {

  imagesUrl !: File
  img!: any
  constructor(private http: HttpClient, private data: DataService) { }


  ngOnInit() {
  }

  addApartment(data: any) {

    let db = new FormData()

    for (const key in data) {

      db.append(key, data[key])
    }
    let owner_id:any= 1;
    let city_id:any= 1;
    db.append('images', this.imagesUrl, this.imagesUrl.name)
    db.append('owner_id', owner_id)
    db.append('city_id', city_id)


    //{ headers: new HttpHeaders().append('Authorization','')}
    this.http.post('http://127.0.0.1:8000/api/apartements', db).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

  }

  selectFiles(event): void {
    this.imagesUrl = event.target.files[0]
  }

}
