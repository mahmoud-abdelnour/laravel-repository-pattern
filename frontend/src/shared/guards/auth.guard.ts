import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtHelperService,
    private router:Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = localStorage.getItem('access_token');
      if(token) {
        try {
          let exp = this.jwtService.isTokenExpired(token);
          if(!exp)  return true;
          else return this.cantGo()
        } catch(e) {
          return this.cantGo()
        }
      }
     return this.cantGo()
  }

  cantGo( ) {
    let lang = localStorage.getItem('lang');
    localStorage.clear();
    localStorage.setItem('lang', lang);
    this.router.navigate(['/auth/login'])
    return false;
  }
}
