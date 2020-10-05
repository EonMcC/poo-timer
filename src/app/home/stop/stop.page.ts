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

  minutes: string;
  showMinutes: boolean;
  seconds: string;


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
    this.breakDownTime(this.dataService.stopTime);
  }

  breakDownTime(wholeTime) {
    const minutes = wholeTime.slice(0, 2);
    const seconds = wholeTime.slice(3, 5);
    

    this.arrangeText(minutes);
    
    

    this.minutes = minutes.slice(0,1) === '0' ? minutes.slice(1,2) : minutes.slice(0,2);
    this.seconds = seconds.slice(0,1) === '0' ? seconds.slice(1,2) : seconds.slice(0,2);
    
  }

  arrangeText(minutes){
    //rember to change to handle hours. Minutes can't be 00 etc. Below function isn't right but along those lines.
    // this.minutes === '00' && this.hours === '00' ? this.showMinutes = false : this.showMinutes = true;
    minutes === '00' ? this.showMinutes = false : this.showMinutes = true;
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
