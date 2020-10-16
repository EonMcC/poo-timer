import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService, User } from '../data-service.service';
import { APIService } from '../../API.service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private apiService: APIService,
    private toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.user = this.dataService.user
  }

  handleUpdateUser() {
    this.apiService.UpdateUser({
      id: this.user.id,
      currency: this.user.currency,
      hourlyRate: this.user.hourlyRate
    }).then((data) => {
      try {
        this.presentUpdateToast(true);
      } catch (error) {
        this.presentUpdateToast(false);
      }
    })
  }

  async presentUpdateToast(choice: boolean) {
    const toast = await this.toastController.create({
      message: choice ? 'Setting Updated': 'Update Failed, please try again later',
      duration: 2000
    });
    toast.present();
  }

  async handleDeleteStatsClick() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'This action will delete all stats; are you sure you want to do this? This action cannot be reversed.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Delete',
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
    this.user.totalPooTime = 0;
    this.user.numberOfPoos = 0;
    this.user.pooStreak = 0;
    this.user.shortestPooTime = null;
    this.user.longestPooTime = 0;
    this.apiService.UpdateUser({
      id: this.user.id,
      totalPooTime: this.user.totalPooTime,
      numberOfPoos: this.user.numberOfPoos,
      pooStreak: this.user.pooStreak,
      shortestPooTime: this.user.shortestPooTime,
      longestPooTime: this.user.longestPooTime
    }).then((data) => {
      const toastMessage = 'Stats deleted.'
      this.presentToast(toastMessage)
    });
  }

  handleUnregisterClick() {
    this.presentUnregisterAlert();
  }

  async presentUnregisterAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to unregister? You will lose all saved data. This action cannot be reversed.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.unregister();
          }
        }
      ]
    })
    alert.present();
  }

  unregister() {
    this.apiService.DeleteUser({id: this.user.id}).then((data) => {
      try {
        Auth.signOut().then(() => {
          this.dataService.user = null;
          const toastMessage = 'Account unregistered. Bye Bye';
          this.presentToast(toastMessage);
          this.router.navigate(['/auth']);
        });
      } catch (error) {
        const toastMessage = 'Deletion Failed, please try again later';
        this.presentToast(toastMessage);
      }
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goBack(){
    this.router.navigate(['/home'])
  }


}
