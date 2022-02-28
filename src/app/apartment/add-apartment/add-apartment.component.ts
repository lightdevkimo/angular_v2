import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apart } from 'src/app/_models/user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-addApartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.scss']
})
export class AddApartmentComponent implements OnInit {
  imagesUrl !:FileList

  constructor(private http: HttpClient, private data: DataService) { }



  ngOnInit() {
  }

  addApartment(data:any){

    data.images=this.imagesUrl;
    data.owner_id=1;
    data.city_id=1;

    console.log(data);
    console.log(this.imagesUrl);
    //{ headers: new HttpHeaders().append('Authorization','')}
    this.http.post('http://127.0.0.1:8000/api/apartements',data).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    });

  }

  selectFiles(event): void {
    this.imagesUrl = event.target.files

  }


}
