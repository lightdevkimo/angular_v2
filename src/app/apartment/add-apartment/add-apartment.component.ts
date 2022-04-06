import { img, user_info } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apart, cities } from 'src/app/_models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addApartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.scss'],
})
export class AddApartmentComponent implements OnInit {
  user_info: user_info;

  imagesUrl!: File[];
  img!: any;
  error = [];

  gov: cities[] = [];
  cities: cities[] = [];
  test = true;

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getcities();
  }

  getcities() {
    this.http.get('http://127.0.0.1:8000/api/governates').subscribe((data) => {
      for (let i = 0; i < data['data'].length; i++) {
        this.gov[i] = data['data'][i];
      }
    });
  }

  choosegov(event: any) {
    this.http
      .get('http://127.0.0.1:8000/api/findcities/'.concat(event.target.value))
      .subscribe((data) => {
        for (let i = 0; i < data['data'].length; i++) {
          this.cities[i] = data['data'][i];
        }
      });
    this.test = true;
  }

  addApartment(data: any) {
    let db = new FormData();

    for (const key in data) {
      db.append(key, data[key]);
    }
    console.log(this.imagesUrl);

    // let owner_id:any= 1;
    for(let i=0; i<this.imagesUrl.length; i++){
        db.append('images'+i, this.imagesUrl[i]);
    }
    if(this.imagesUrl.length>0){
      db.append('images',this.imagesUrl.length+'');
    }
    db.append('owner_id', JSON.parse(localStorage.getItem('user_info'))['id']);
    db.append('city_id', data['state']);

    this.http
      .post('http://127.0.0.1:8000/api/apartements', db, {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl('/profile');
        },
        (err) => {
          this.error=[]
          for (const e in err.error.errors) {
            console.log(err.error.errors[e]);

            this.error.push( err.error.errors[e]);
          }
        }
      );
  }

  selectFiles(event): void {
    this.imagesUrl = event.target.files;
  }
}












































// import { img, user_info } from './../../_models/user.model';
// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { apart, cities } from 'src/app/_models/user.model';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { DataService } from 'src/app/_services/data.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-addApartment',
//   templateUrl: './add-apartment.component.html',
//   styleUrls: ['./add-apartment.component.scss'],
// })
// export class AddApartmentComponent implements OnInit {
//   user_info: user_info;

//   imagesUrl!:File[];

//   imagesarray:any=[];
//   //img!: any;
//   error = [];

//   gov: cities[] = [];
//   cities: cities[] = [];
//   test = true;

//   constructor(
//     private http: HttpClient,
//     private data: DataService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.getcities();
//   }

//   getcities() {
//     this.http.get('http://127.0.0.1:8000/api/governates').subscribe((data) => {
//       for (let i = 0; i < data['data'].length; i++) {
//         this.gov[i] = data['data'][i];
//       }
//     });
//   }

//   choosegov(event: any) {
//     this.http
//       .get('http://127.0.0.1:8000/api/findcities/'.concat(event.target.value))
//       .subscribe((data) => {
//         for (let i = 0; i < data['data'].length; i++) {
//           this.cities[i] = data['data'][i];
//         }
//       });
//     this.test = true;
//   }


//   addApartment(data: any) {
//     let db = new FormData();


//     for (const key in data) {
//       db.append(key, data[key]);
//     }



//     // let owner_id:any= 1;

//     for(let i=0; i<this.imagesUrl.length; i++){
//       this.imagesarray[i]=this.imagesUrl[i]
//     // console.log(this.imagesUrl[i]);
//     // console.log(this.imagesarray[i]);

//     }
//     // console.log(this.imagesarray);

//     db.append('images0', this.imagesarray);

//     db.append('owner_id', JSON.parse(localStorage.getItem('user_info'))['id']);
//     db.append('city_id', data['state']);



//     //console.log(db['images']);
//     // db.forEach((i)=>{
//     //     console.log(i);
//     // });

//     this.http
//       .post('http://127.0.0.1:8000/api/apartements', db, {
//         headers: new HttpHeaders().append(
//           'Authorization',
//           'Bearer ' + localStorage.getItem('token')
//         )
//         // .append(
//         //   'Content-Type','multipart/form-data'
//         // ),
//       })
//       .subscribe(
//         (data) => {

//           console.log(data);
//           //this.router.navigateByUrl('/profile');
//         },
//         (err) => {
//           this.error=[]
//           for (const e in err.error.errors) {

//             console.log(err.error.errors[e]);

//             this.error.push( err.error.errors[e]);
//           }
//         }
//       );
//   }


//   selectFiles(event){
//         this.imagesUrl = event.target.files;
//         //console.log(this.imagesUrl);
//   }
// }
