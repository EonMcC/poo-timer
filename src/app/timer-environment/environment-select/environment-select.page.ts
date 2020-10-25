import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import * as moment from 'moment';
import { User, UserStorageService } from 'src/app/services/user-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-environment-select',
  templateUrl: './environment-select.page.html',
  styleUrls: ['./environment-select.page.scss'],
})
export class EnvironmentSelectPage  {

  environments: Array<Environment>;
  user: User;

  constructor(
    private dataService: DataServiceService,
    private environmentStorageService: EnvironmentStorageService,
    private userStorageService: UserStorageService,
    private router: Router,
    public alertController: AlertController,
  ) { 

  }

  ionViewWillEnter () {
    console.log('init')
    this.environmentStorageService.listEnvironments().then((environments) => {
      this.environments = environments;
      console.log('environments', environments)
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
      this.dataService.environment = environment;
      this.router.navigate(['/home']);
    })
  }

  async handleTrashClick(event, environment) {
    console.log(event)
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'This action will delete the environment and assosiated data. Are you sure you want to do this?  This action cannot be reversed.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteEnvironment(environment);
          }
        }
      ]
    })
    alert.present();
  }

  deleteEnvironment(environment) {
    this.environmentStorageService.deleteEnvironment(environment.id).then((data) => {
      this.environments = data;
      if (environment.id === this.user.activeEnvironmentID) {
        this.user.activeEnvironmentID = 1;
        this.userStorageService.updateUser(this.user);
      }
    })
  }

  addNewEnvironment() {
    this.router.navigate(['/environment-setup'])
  }

}
