import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user_info } from 'src/app/_models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id:number;
  user: user_info[] = []

  constructor(private activeRouter: ActivatedRoute, private http: HttpClient) { }
  isLoading = false;

  error:string=null
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id']
    this.Users()
  }

  Users() {
    this.http.get('http://127.0.0.1:8000/api/user/' + this.id, { headers: new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token')) }).subscribe(data => {
      this.user = data['data'];

    });
  }

  onsave(data: any){
    console.log(data.value)
    this.http.put('http://127.0.0.1:8000/api/user/' + this.id,data.value, { headers: new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token')) }).subscribe(data => {

      console.log(data)

    });

  }


}
