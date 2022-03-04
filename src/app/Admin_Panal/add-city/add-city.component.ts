import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  cities: [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.Cities();
  }

  Cities() {
    this.http
      .get('http://127.0.0.1:8000/api/cities', {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe((data) => {
        this.cities = data['data'];
        console.log(this.cities);
        setTimeout(() => {
          $('#datatablecities').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 20, 50],
          });
        }, 1);
      });

  }
}
