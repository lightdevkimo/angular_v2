import { apart } from 'src/app/_models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  peopleComments=[]
  peopleNames=[]
  rentApart :any
  personName=""
  constructor(private activeRouter: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // console.log(this.activeRouter.snapshot.params)
    this.id = this.activeRouter.snapshot.params['id']
    console.log(this.id)

    this.showApart()
    this.showComments()
  }

  showApart() {
    this.http.get('http://127.0.0.1:8000/api/apartements/' + this.id).subscribe(data => {

      //for (let i = 0; i < data['data'].length; i++) {
      // this.apart[i] = (data['data'][i]);
      // console.log(data);
      this.apart = data['data'];
      // console.log(this.apart);

      // }
    });

  }

  getUserInfo(userId:number):any{
    this.http.get('http://127.0.0.1:8000/api/user/'+userId).subscribe(
      data=>{
        // console.log(data['data']['name']);
        this.personName =  data['data']['name']
        this.peopleNames.push(this.personName)
        // console.log(this.personName);

      }
    )
  }

  showComments() {
    this.http.get('http://127.0.0.1:8000/api/comment',
    {
      params: new HttpParams().append(
          "apartment",this.id
          )
    }).subscribe(
      data=>{
        // console.log(data);
        // alert(res['data'])
        // location.reload()
        
        for (let i = 0; i < data['data'].length; i++) {
          this.rentApart = data['data'][i]
          this.peopleComments[i] = (this.rentApart);
          this.getUserInfo(this.rentApart['user_id'])
          
        }
  
      },
      err=>{
        console.log(err);
        // alert(err['error'])
        // location.reload()

        
      }
    )
    
  }


}
