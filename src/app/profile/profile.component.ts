import { Component, OnInit } from '@angular/core';
import { user_info, rentApartment } from '../_models/user.model';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { map, timeout } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  user_info: user_info;
  rentApartmentsReq: rentApartment[];
  apartmentRequested:any=[];
  apartmentApproved:any=[];
  rentApartmentsConf: rentApartment[];
  OwnerApartmentRequests=[];
  apartmentsDetailsReq = [];
  apartmentsDetailsConf = [];
  Owner_apartments_request = [];

  editMode = false;
  currentCard: number;
  errorReq: string = '';
  errorConf: string = '';
  error:string = '';
  errorApartmentRequested:string='';
  errorapartmentApproved:string='';
  errorOwnerApartmentRequests:string='';


  peopleNames=[]
  personName=""

  url = 'http://127.0.0.1:8000/images/';

  ngOnInit(): void {
    this.user_info = JSON.parse(localStorage.getItem('user_info'));
    this.getRentApartmentReq();
    this.getRentApartmentConf();
    this.getApartmentRequested();
    this.getApartmentApproved();
    this.getOwnerApartmentRequests();
  }

  ConfirmRequest(index:number) {
    this.http
      .put('http://127.0.0.1:8000/api/rent/'+this.OwnerApartmentRequests[index]['id'],{}
      , {headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})

      .subscribe(
        (data) => {
          this.router.navigateByUrl('/home');
        }
        ,(err) => {
          console.log(err);

        }
        );
  }


  RejectRequest(index:number) {
    this.http
      .delete(
        'http://127.0.0.1:8000/api/rent/' + this.OwnerApartmentRequests[index]['id'],{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}
      )
      .subscribe((data) => {
        this.router.navigateByUrl('/home');
      },(err) => {
          console.log(err);

        }
        );
  }


  getOwnerApartmentRequests() {
    this.http
      .get<{ data: rentApartment[] }>('http://127.0.0.1:8000/api/rent', {
        params: new HttpParams()
          .append('owner', this.user_info['id'])
          .append('status', 'requested'),
          headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (res) => {
          this.OwnerApartmentRequests = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'req','owner');
            this.getUserInfo(r['user_id'])

          }

          for (let i = 0; i < res['data'].length; i++) {
            //console.log(this.OwnerApartmentRequests[i]['images'].split(',')[0])
            this.OwnerApartmentRequests[i]['link'] =this.OwnerApartmentRequests[i]['images'].split(',')[0];
          }
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorOwnerApartmentRequests += err.error.errors[e];
          }
        }
      );
  }

  getUserInfo(userId:number):any{
    this.http.get('http://127.0.0.1:8000/api/user/'+userId).subscribe(
      data=>{
        this.personName =  data['data']['name']
        this.peopleNames.push(this.personName)
      }
    )
  }


  getApartmentRequested() {
    this.http
      .get('http://127.0.0.1:8000/api/apartement/requested',
      {
        params: new HttpParams()
        .append('owner_id', this.user_info['id']),
        headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (data) => {
          this.apartmentRequested = data['data'];
          for (let i = 0; i < data['data'].length; i++) {
            console.log(this.apartmentRequested[i]['images'].split(',')[0])
            this.apartmentRequested[i]['link'] =this.apartmentRequested[i]['images'].split(',')[0];
          }
          //console.log(data)
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorApartmentRequested += err.error.errors[e];
          }
        }
      );
  }

  getApartmentApproved() {
    this.http
      .get('http://127.0.0.1:8000/api/apartement/approved',
      {
        params: new HttpParams()
        .append('owner_id', this.user_info['id']),
        headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (data) => {
          this.apartmentApproved = data['data'];
          for (let i = 0; i < data['data'].length; i++) {
            //console.log(this.apartmentApproved[i]['images'].split(',')[0])
            this.apartmentApproved[i]['link'] =this.apartmentApproved[i]['images'].split(',')[0];
          }
          //console.log(data)
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorapartmentApproved += err.error.errors[e];
          }
        }
      );
  }

  changePassword(data:any) {
    data['email']=this.user_info['email']
    this.http
      .post('http://127.0.0.1:8000/api/user/changepassword',data,{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})

      .subscribe(
        (data) => {
            console.log(data);
        },
        (err) => {
          console.log(err);
          for (const e in err.error.errors) {
            this.error += err.error.errors[e];
          }
        }
      );
  }

  getRentApartmentReq() {
    this.http
      .get<{ data: rentApartment[] }>('http://127.0.0.1:8000/api/rent', {
        params: new HttpParams()
          .append('user', this.user_info['id'])
          .append('status', 'requested'),
          headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (res) => {
          this.rentApartmentsReq = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'req','user');
          }

          for (let i = 0; i < res['data'].length; i++) {
            //console.log(this.rentApartmentsReq[i]['images'].split(',')[0])
            this.rentApartmentsReq[i]['link'] =this.rentApartmentsReq[i]['images'].split(',')[0];
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
          headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (res) => {
          this.rentApartmentsConf = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'conf','user');
          }

          for (let i = 0; i < res['data'].length; i++) {
            //console.log(this.rentApartmentsConf[i]['images'].split(',')[0])
            this.rentApartmentsConf[i]['link'] =this.rentApartmentsConf[i]['images'].split(',')[0];
          }

        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorConf += err.error.errors[e];
          }
        }
      );
  }

  showApart(id: number, status: string,type:string) {
    this.http
      .get('http://127.0.0.1:8000/api/apartements/' + id)
      .subscribe((res) => {
        if (status == 'req' && type == 'user') {
          this.apartmentsDetailsReq.push(res['data']);
          this.apartmentsDetailsReq[this.apartmentsDetailsReq.length-1]['link'] =this.apartmentsDetailsReq[this.apartmentsDetailsReq.length-1]['images'].split(',')[0];

        } else if (status == 'conf' && type == 'user') {
          this.apartmentsDetailsConf.push(res['data']);
          this.apartmentsDetailsConf[this.apartmentsDetailsConf.length-1]['link'] =this.apartmentsDetailsConf[this.apartmentsDetailsConf.length-1]['images'].split(',')[0];


        } else {
          this.Owner_apartments_request.push(res['data']);
          this.Owner_apartments_request[this.Owner_apartments_request.length-1]['link'] =this.Owner_apartments_request[this.Owner_apartments_request.length-1]['images'].split(',')[0];


        }
      });
  }

  withdraw(index: number) {
    this.http
      .delete(
        'http://127.0.0.1:8000/api/rent/' + this.rentApartmentsReq[index]['id'],{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}
      )
      .subscribe((res) => {
        console.log(res);
      });

    this.router.navigateByUrl('/find');
  }

  changeMode(mode: boolean, cardId: number) {
    this.editMode = mode;
    this.currentCard = cardId;
  }

  updateComment(form: NgForm, rentApart: number) {
    this.http
      .post(
        'http://127.0.0.1:8000/api/comment',
        {
          comment: form.value.comment,
        },
        {
          params: new HttpParams()
            .append('user', rentApart['user_id'])
            .append('apartment', rentApart['apartment_id']),
            headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))

        }

      )
      .subscribe(
        (res) => {
          location.reload();
        },
        (err) => {
          location.reload();
        }
      );
    this.changeMode(false, null);
  }
}
