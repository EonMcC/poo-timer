import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import * as moment from 'moment';
import { User, UserStorageService } from 'src/app/services/user-storage.service';
import { AlertController } from '@ionic/angular';
import { ItemStorageService } from 'src/app/services/item-storage.service';

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
    private itemStorageService: ItemStorageService
  ) { 

  }

  ionViewWillEnter () {
    this.environmentStorageService.listEnvironments().then((environments) => {
      this.environments = environments;
    })
    this.user = this.dataService.user;
  }

  calculateTimingSinceDate(date) {
    return moment(date).format('MMM \'YY');
  }

  selectEnvironment(environment) {
    this.user.activeEnvironmentID = environment.id
    this.userStorageService.updateUser(this.user).then((user) => {
      this.dataService.environment = environment;
      this.router.navigate(['/home']);
    })
  }

  async handleTrashClick(event, environment) {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Delete!',
      message: 'This action will delete the environment and assosiated data. Are you sure you want to do this? This action cannot be reversed.',
      cssClass: "alert-class",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "alert-cancel-button",
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: "alert-confirm-button",
          handler: () => {
            console.log('envrionmentid', environment.id);
            this.itemStorageService.deleteEnvironmentItems(environment.id)
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
