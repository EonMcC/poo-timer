import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.page.html',
  styleUrls: ['./stop.page.scss'],
})

export class StopPage implements OnInit {

  hours: string;
  minutes: string;
  seconds: string;
  showHours: boolean;
  showMinutes: boolean;

  email: string;


  constructor(
      public alertController: AlertController,
      public toastController: ToastController,
      private router: Router,
      private dataService: DataServiceService
    ) { }

    get data():string {
      return this.dataService.stopTime;
    }

  ngOnInit() {
    this.dataService.stopTime.length > 5 ? this.breakDownTimeInclHours(this.dataService.stopTime) : this.breakDownTime(this.dataService.stopTime);
    this.email = this.dataService.user.email;
  }

  breakDownTime(wholeTime) {
    const minutes = wholeTime.slice(0, 2);
    const seconds = wholeTime.slice(3, 5);
    
    this.arrangeText(minutes);
    
    this.minutes = minutes.slice(0,1) === '0' ? minutes.slice(1,2) : minutes.slice(0,2);
    this.seconds = seconds.slice(0,1) === '0' ? seconds.slice(1,2) : seconds.slice(0,2);
  }

  breakDownTimeInclHours(wholeTime) {
    const hours = wholeTime.slice(0, 2);
    const minutes = wholeTime.slice(3, 5);
    const seconds = wholeTime.slice(6, 8);

    this.arrangeText(minutes, hours)

    this.hours = hours.slice(0,1) === '0' ? hours.slice(1,2) : hours.slice(0,2);
    this.minutes = minutes.slice(0,1) === '0' ? minutes.slice(1,2) : minutes.slice(0,2);
    this.seconds = seconds.slice(0,1) === '0' ? seconds.slice(1,2) : seconds.slice(0,2);
  }

  arrangeText(minutes, hours?){
    if (!hours) {
      minutes === '00' ? this.showMinutes = false : this.showMinutes = true;
    } else {
      this.showMinutes = true;
      this.showHours = true;
    }
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
