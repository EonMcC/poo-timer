import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  signedIn = false;


  constructor(public router: Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {
      return true;
    })
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {
      return true;
    })
  }
}