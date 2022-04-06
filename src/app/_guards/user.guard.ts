import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(

    private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem("salt")==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6ImhlbGxvIn0.mzFAbbzRu-Oada93Er2zZj2eDdTcDpe1vLeRLAGCCPc' || localStorage.getItem("salt")==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJieWVieWUiOiJieWVieWUifQ.EO2FQLVSrgS74bZHch0kxu-HzUK56osW8BdT7WShyoU' ||localStorage.getItem("salt")==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYWJsbGxsIjoiaGhoaGgifQ.YW5xOWv0c2kyAY_GU1M5XZmJehS5wOZcehZg2KIHs-A') {
        return true
    }

    this.router.navigate(['/home']);
    return false;
  }

}
