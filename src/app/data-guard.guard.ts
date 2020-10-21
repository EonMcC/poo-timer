import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from './services/data-service.service';
import { Environment, EnvironmentStorageService } from './services/environment-storage.service';
import { UserStorageService } from './services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataGuardGuard implements CanActivate {

  constructor(
    public router: Router,
    private userStorageService: UserStorageService,
    private environmentStorageService: EnvironmentStorageService,
    private dataService: DataServiceService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userStorageService.getUser().then((user) => {
      if (user) {
        this.dataService.user = user;
        const environmentID = user.activeEnvironmentID;
        this.environmentStorageService.getEnvironment(environmentID).then((environment: Environment) => {
          this.dataService.environment = environment;
          console.log('environment', environment)
        })
        return true;
      }
    })
  }
  
}
