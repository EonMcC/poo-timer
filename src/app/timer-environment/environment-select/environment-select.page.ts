import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import * as moment from 'moment';
import { User, UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-environment-select',
  templateUrl: './environment-select.page.html',
  styleUrls: ['./environment-select.page.scss'],
})
export class EnvironmentSelectPage implements OnInit {

  environments: Array<Environment>;
  user: User;

  constructor(
    private dataService: DataServiceService,
    private environmentStorageService: EnvironmentStorageService,
    private userStorageService: UserStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.environmentStorageService.listEnvironments().then((environments) => {
      this.environments = environments;
    })
    this.user = this.dataService.user;
  }

  calculateTimingSinceDate(date) {
    return moment(date).format('MMM \'YY');
  }

  selectEnvironment(environment) {
    this.userStorageService.getUser().then((user) => {
      this.user = user;
      this.user.activeEnvironmentID = environment.id;
      this.userStorageService.updateUser(this.user);
      this.router.navigate(['/home']);
    })
  }

}
