import { cities,apart } from './../_models/user.model';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getcities();

  }

  public dragResult=1;
  public changeResult=1;
  gov: cities[]=[];
  cities: cities[]=[];
  apart: apart[]=[];
  test=false;

  getcities(){
    this.http.get('http://127.0.0.1:8000/api/cities').subscribe(data =>{

      for (let i = 0; i < data['data'].length; i++) {
        this.gov[i]=(data['data'][i]);
      }
    });


  }



  choosegov(event: any){
    this.http.get('http://127.0.0.1:8000/api/findcities/'.concat(event.target.value)).subscribe(data =>{
      for (let i = 0; i < data['data'].length; i++) {
        this.cities[i]=(data['data'][i]);
        //console.log(this.cities[i]);
      }
    });
    this.test=true;
    //console.log(this.test);
  }

  // showVal(event:any){
  //   console.log(event.target.value);
  // }

  showVal(event:any){
    this.changeResult = parseFloat(event.target.value);
    //console.log(event.target.value);
  }

//   <input type="range" #ref (change)="changeZoom(ref.value)"/>

// changeZoom(value: number) { ... }
/*
public onSearch(data:any){
  console.log(data);
}
*/
//http://127.0.0.1:8000/api/apartement/search?max_price=5000&min_price=1000&city_id=1&gender=male


onSearch(data:any)
  {

    let kimo:any;
    for (let i = 0; i < this.cities.length; i++) {

      if(this.cities[i]['name']===data['state']){
        kimo=this.cities[i]['id']
      }
    }

    let params=new HttpParams();
      params= params.append('gender',data['gender']);
      params= params.append('max_price',data['min']);
      params= params.append('min_price',data['max']);
      params= params.append('city_id',kimo);

  this.http.get('http://127.0.0.1:8000/api/apartement/search',{params:params})
    .subscribe((result)=>{
      //console.log("result",result['data'].length)
      for (let i = 0; i < result['data'].length; i++) {
        this.apart[i]=(result['data'][i]);
        console.log(this.apart[i]);
      }

    })
  //console.log(data);



  }




}




