import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesGuard implements CanActivate {
  constructor(
    private userService:UserService,
    private router:Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let check = this.check(route.data['ability']);
    if(!check) this.router.navigate(['/'])
    return check
  }
  
  check(ability) {
    return !!this.userService.userData?.entity?.abilities[ability]
  }

}
