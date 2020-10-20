import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as moment from 'moment';
import { ItemStorageService } from 'src/app/services/item-storage.service';
import { User, UserStorageService } from 'src/app/services/user-storage.service';
import { Environment } from 'src/app/services/environment-storage.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.page.html',
  styleUrls: ['./stop.page.scss'],
})

export class StopPage implements OnInit {

  user: User;
  environment: Environment
  hours: string;
  minutes: string;
  seconds: string;
  showHours: boolean;
  showMinutes: boolean;
  paid: string;
  paidRaw: number;


  constructor(
      public alertController: AlertController,
      public toastController: ToastController,
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService,
      private userStorageService: UserStorageService
    ) { }

    get data():string {
      return this.dataService.stopTime;
    }

  ngOnInit() {
    this.user = this.dataService.user;
    this.environment = this.dataService.environment;
    console.log('this.environment', this.environment)
    this.dataService.stopTime.length > 5 ? this.breakDownTimeInclHours(this.dataService.stopTime) : this.breakDownTime(this.dataService.stopTime);
    this.calculateMoney(this.dataService.stopTimeRaw, this.environment.hourlyRate);
  }

  calculateMoney(time, hourlyRate) {
    if (time) {
      this.paidRaw = ((hourlyRate / 3600) * time);
      if (this.paidRaw < .01) {
        const paid = this.paidRaw.toFixed(3);
        this.formatMoney(paid);
      } else {
        const paid = this.paidRaw.toFixed(2);
        this.formatMoney(paid);
      }
    }
  }

  formatMoney(paid) {
    console.log('paid', paid, 'currency', this.environment.currency)
    const currency = this.environment.currency;
    if (currency === '£ Pieces of Unicorn Dust' || currency === '$ Pieces of Eight' || currency === '£ Old Money Pounds') {
      const symbol = currency.slice(0,1);
      const moneyType = currency.slice(2);
      this.paid = `${symbol}${paid} ${moneyType}`
    } else {
      this.paid = `${currency}${paid}`
    }
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

  acceptTime() {
    const duration = this.dataService.stopTimeRaw;
    // this.calcTotItemTime(duration);
    this.calcTotalPoos();
    // this.calcPooStreak();
    this.calcLongestPooTime(duration);
    this.calcShortestPooTime(duration);
    this.calcTotalPaid();
    const createdAt = moment.now()

    const environmentID = this.user.activeEnvironmentID;
    const id = this.environment.lastItemID + 1;

    this.itemStorageService.addItem({id, environmentID, duration, createdAt, worth: this.paidRaw}).then((poo) => {
      console.log('returnedPoo', poo);
    })
  }

  calcTotalPooTime(duration) {
    this.environment.totalTime += duration
  }

  calcTotalPoos() {
    this.environment.itemCount += 1;
  }

  // calcPooStreak() {
  //   const today = moment.now();
  //   const lastPooDate = this.user.lastPooDate;
  //   if (this.user.lastPooDate !== null) {
  //     if (today - lastPooDate > 86400000 && today - lastPooDate < 172800000) {
  //       this.user.pooStreak += 1;
  //       this.user.lastPooDate = moment.now();
  //     } else {
  //       this.user.pooStreak = 1;
  //       this.user.lastPooDate = moment.now();
  //     }
  //   } else {
  //     this.user.pooStreak = 1;
  //     this.user.lastPooDate = moment.now();
  //   }
  // }

  calcLongestPooTime(duration) {
    if (duration > this.environment.longestTime) {
      this.environment.longestTime = duration;
    }
    if (this.environment.shortestTime === null) {
      this.environment.shortestTime = duration;
    }
  }

  calcShortestPooTime(duration) {
    if (duration < this.environment.shortestTime) {
      this.environment.shortestTime = duration;
    }
  }

  calcTotalPaid() {
    if (this.environment.hourlyRate) {
      const time = this.environment.totalTime;
      this.environment.totalPaid = (this.environment.hourlyRate / 3600) * time;
    } else {
      this.environment.totalPaid = 0;
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
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.dataService.stopTime = null;
            this.dataService.stopTimeRaw = null;
            this.presentToast('discard');
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(action) {
    if (action === 'discard') {
      const toast = await this.toastController.create({
        message: 'Poo Discarded',
        position: 'top',
        duration: 2000
      });
      toast.present();
    } else if (action === 'save') {
      const toast = await this.toastController.create({
        message: 'Poo Saved',
        position: 'top',
        duration: 2000
      });
      toast.present();
    }
  }

}
