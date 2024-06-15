import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
  
export class AuthGuard implements CanActivate {

  constructor(private _dataservice : DataserviceService , private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._dataservice.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['/login'])
    }
    return true;
  }
  
}
