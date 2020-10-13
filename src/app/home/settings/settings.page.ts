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
    this.apiService.UpdateUser(this.user).then((data) => {
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

  handleUnregisterClick() {
    this.presentUnregisterAlert();
  }

  async presentUnregisterAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to unregister? You will lose all saved data. This action cannot be reverse.',
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
          this.presentUnregisterToast(true);
          this.router.navigate(['/auth']);
        });
      } catch (error) {
        this.presentUnregisterToast(false);
      }
    })
  }

  async presentUnregisterToast(choice: boolean) {
    const toast = await this.toastController.create({
      message: choice ? 'Account unregistered. Bye Bye': 'Deletion Failed, please try again later',
      duration: 2000
    });
    toast.present();
  }

  goBack(){
    this.router.navigate(['/home'])
  }


}
