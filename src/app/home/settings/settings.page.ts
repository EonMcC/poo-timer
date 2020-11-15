import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { AlertController } from '@ionic/angular';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { ItemStorageService } from 'src/app/services/item-storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  environment: Environment;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    public alertController: AlertController,
    private environmentStorageService: EnvironmentStorageService,
    private userStorageService: UserStorageService,
    private itemStorageService: ItemStorageService,
    public ngZone: NgZone,
    private toastService: ToastService
  ) { 

  }

  ngOnInit() {
    this.environment = this.dataService.environment;
  }

  handleUpdateEnvironment() {
    this.environmentStorageService.updateEnvironment(this.environment).then((data) => {
      try {
        this.toastService.presentToast('Setting Updated');
      } catch (error) {
        this.toastService.presentToast('Update Failed, please try again later');
      }
    })
  }

  async handleDeleteStatsClick() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'This action will delete all stats. Are you sure you want to do this? This action cannot be reversed.',
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
            console.log('Confirm Okay');
            this.deleteStats();
          }
        }
      ]
    })
    alert.present();
  }

  deleteStats() {
    this.environment.totalTime = 0;
    this.environment.itemCount = 0;
    this.environment.streak = 0;
    this.environment.shortestTime = 0;
    this.environment.longestTime = 0;
    this.environment.totalPaid = 0;
    this.environmentStorageService.updateEnvironment(this.environment).then((data) => {
      const toastMessage = 'Stats deleted.'
      this.toastService.presentToast(toastMessage)
    });
  }

  handleDeleteClick() {
    this.presentDeleteAlert();
  }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this environment? You will lose all saved data. This action cannot be reversed.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteEnvironment();
          }
        }
      ]
    })
    alert.present();
  }

  deleteEnvironment() {
    this.environmentStorageService.deleteEnvironment(this.environment.id).then((data) => {
      try {
        this.dataService.environment = null;
        this.itemStorageService.deleteEnvironmentItems(this.dataService.user.activeEnvironmentID);
        this.dataService.user.activeEnvironmentID = 1;
        this.userStorageService.updateUser(this.dataService.user);
        this.toastService.presentToast('Environment deleted. Bye Bye');
        this.environmentStorageService.listEnvironments().then((data) => {
          this.router.navigate(['/environment-select']);
        })
      } catch (error) {
        this.toastService.presentToast('Deletion Failed, please try again later');
      }
    })
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
