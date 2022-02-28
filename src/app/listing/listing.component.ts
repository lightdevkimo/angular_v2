import { cities, apart } from './../_models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public dragResult = 1;
  public changeResult = 1;
  gov: cities[] = [];
  cities: cities[] = [];
  apart: apart[] = [];
  test = false;
  url="http://127.0.0.1:8000/storge/images/"

  getcities() {
    this.http.get('http://127.0.0.1:8000/api/cities').subscribe(data => {

      for (let i = 0; i < data['data'].length; i++) {
        this.gov[i] = (data['data'][i]);
      }
    });


  }



  choosegov(event: any) {
    this.http.get('http://127.0.0.1:8000/api/findcities/'.concat(event.target.value)).subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.cities[i] = (data['data'][i]);
      }
    });
    this.test = true;
  }


  showVal(event: any) {
    this.changeResult = parseFloat(event.target.value);

  }



  onSearch(data: any) {

    let kimo: any;
    for (let i = 0; i < this.cities.length; i++) {

      if (this.cities[i]['name'] === data['state']) {
        kimo = this.cities[i]['id']
      }
    }

    let params = new HttpParams();
    params = params.append('gender', data['gender']);
    params = params.append('max_price', data['min']);
    params = params.append('min_price', data['max']);
    params = params.append('city_id', kimo);

    this.http.get('http://127.0.0.1:8000/api/apartement/search', { params: params })
      .subscribe((result) => {
        for (let i = 0; i < result['data'].length; i++) {
          this.apart[i] = (result['data'][i]);
        }

      })
    console.log(this.apart);
  }




}




