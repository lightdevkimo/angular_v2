import { Component, OnInit } from '@angular/core';
import { user_info, rentApartment } from '../_models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, timeout } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // role='admin'
  constructor(private http: HttpClient, private router: Router) {}
  user_info: user_info;
  // rentApartments : rentApartment[]
  rentApartmentsReq: rentApartment[];
  rentApartmentsConf: rentApartment[];
  // apartmentsDetails=[]
  apartmentsDetailsReq = [];
  apartmentsDetailsConf = [];
  editMode = false;
  currentCard: number;
  // error:string=""
  errorReq: string = '';
  errorConf: string = '';
  // updateStatus="failed"
  // updateMessage="aaaaaaaaaaa"
  url = "http://127.0.0.1:8000/storage/images/"
  
  
  ngOnInit(): void {
    this.user_info = JSON.parse(localStorage.getItem('user_info'));
    // this.getRentApartment()
    this.getRentApartmentReq();
    this.getRentApartmentConf();
    
    setTimeout(()=>{
      console.log(this.rentApartmentsReq);
    console.log(this.rentApartmentsConf);
    console.log(this.apartmentsDetailsReq);
    console.log(this.apartmentsDetailsConf[0]['link']);
    },2000)
    
  }

  /* getRentApartment() {
    this.http.get<{data:rentApartment[]}>('http://127.0.0.1:8000/api/rent',{
      params:new HttpParams().append("user",
      this.user_info['id']
      // 3
      )}
      )
      // .pipe(map(data => Object.keys(data).map(k => data[k])))
      .subscribe(res => {
        // console.log(res['data']);
        
        this.rentApartments = res['data'];
        for(let r of res['data']){
          this.showApart(r['apartment_id'])
        }

    },
    (err) => {
      for (const e in err.error.errors) {
        this.error += err.error.errors[e];
      }
    });

  } */
  getRentApartmentReq() {
    this.http
      .get<{ data: rentApartment[] }>('http://127.0.0.1:8000/api/rent', {
        params: new HttpParams()
          .append('user', this.user_info['id'])
          .append('status', 'requested'),
      })
      // .pipe(map(data => Object.keys(data).map(k => data[k])))
      .subscribe(
        (res) => {
          // console.log(res['data']);

          this.rentApartmentsReq = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'req');
          }
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorReq += err.error.errors[e];
          }
        }
      );
  }
  getRentApartmentConf() {
    this.http
      .get<{ data: rentApartment[] }>('http://127.0.0.1:8000/api/rent', {
        params: new HttpParams()
          .append('user', this.user_info['id'])
          .append('status', 'confirmed'),
      })
      // .pipe(map(data => Object.keys(data).map(k => data[k])))
      .subscribe(
        (res) => {
          // console.log(res['data']);

          this.rentApartmentsConf = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'conf');
          }
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorConf += err.error.errors[e];
          }
        }
      );
  }

  showApart(id: number, status: string) {
    this.http
      .get('http://127.0.0.1:8000/api/apartements/' + id)
      .subscribe((res) => {
        if (status == 'req') {
          this.apartmentsDetailsReq.push(res['data']);
        } else if (status == 'conf') {
          this.apartmentsDetailsConf.push(res['data']);
        }
      });
  }

  withdraw(index: number) {
    // console.log(this.rentApartments[index]['id']);

    this.http
      .delete(
        'http://127.0.0.1:8000/api/rent/' + this.rentApartmentsReq[index]['id']
      )
      .subscribe((res) => {
        console.log(res);
      });
    // this.getRentApartment()
    this.router.navigateByUrl('/find');
  }

  changeMode(mode: boolean, cardId: number) {
    this.editMode = mode;
    this.currentCard = cardId;
  }

  updateComment(form: NgForm, rentApart:number) {
    this.http.post('http://127.0.0.1:8000/api/comment',
    {
      
        "comment":form.value.comment
      
    },{
      params: new HttpParams().append(
        "user",rentApart['user_id']
        ).append(
          "apartment",rentApart['apartment_id']
          )
    }).subscribe(
      res=>{
        // console.log(res);
        // alert(res['data'])
        location.reload()
      },
      err=>{
        // console.log(err);
        // alert(err['error'])
        location.reload()

        
      }
    )
    this.changeMode(false, null)
  }
}
