import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.page.html',
  styleUrls: ['./stop.page.scss'],
})
export class StopPage implements OnInit {

  constructor(
      public alertController: AlertController,
      public toastController: ToastController,
      private router: Router
    ) { }

  ngOnInit() {
  }

  discardTime(){
    this.presentAlertConfirm().then(ans => {

    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to discard this time?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.presentToast();
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Time Discarded',
      duration: 2000
    });
    toast.present();
  }

}
