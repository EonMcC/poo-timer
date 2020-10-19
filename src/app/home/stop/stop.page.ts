import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { DataServiceService } from '../../services/data-service.service';
import * as moment from 'moment';
import { ItemStorageService } from 'src/app/services/item-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.page.html',
  styleUrls: ['./stop.page.scss'],
})

export class StopPage implements OnInit {

  user: any;
  hours: string;
  minutes: string;
  seconds: string;
  showHours: boolean;
  showMinutes: boolean;
  paid: string;


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
    this.getUser();
    this.dataService.stopTime.length > 5 ? this.breakDownTimeInclHours(this.dataService.stopTime) : this.breakDownTime(this.dataService.stopTime);
    this.calculateMoney(this.dataService.stopTimeRaw, this.user.hourlyRate);
  }

  getUser() {
    this.userStorageService.getUser().then((user) => {
      if (user) {
        this.dataService.user = user;
      } else {
        this.router.navigate(['/initial-setup'])
      }
    })
  }

  calculateMoney(time, hourlyRate) {
    if (time) {
      const paidNumber = ((hourlyRate / 3600) * time);
      if (paidNumber < .01) {
        const paid = paidNumber.toFixed(3);
        this.formatMoney(paid);
      } else {
        const paid = paidNumber.toFixed(2);
        this.formatMoney(paid);
      }
    }
  }

  formatMoney(paid) {
    const currency = this.user.currency;
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
    const userId = this.user.id;
    const duration = this.dataService.stopTimeRaw;
    // this.calcTotItemTime(duration);
    this.calcTotalPoos();
    this.calcPooStreak();
    this.calcLongestPooTime(duration);
    this.calcShortestPooTime(duration);
    this.calcTotalPaid();

    const createdAt = moment.now()
    this.itemStorageService.addItem({id: 1, duration, createdAt}).then((poo) => {
      console.log('returnedPoo', poo);
    })

    // this.apiService.UpdateUser({
    //   id: this.user.id,
    //   longestPooTime: this.user.longestPooTime,
    //   shortestPooTime: this.user.shortestPooTime,
    //   numberOfPoos: this.user.numberOfPoos,
    //   totalPooTime: this.user.totalPooTime,
    //   lastPooDate: this.user.lastPooDate,
    //   pooStreak: this.user.pooStreak,
    //   totalPaid: this.user.totalPaid
    // }).then((data) => {
    //   try {
    //     this.presentToast('save');
    //     this.router.navigate(['/home']);
    //   } catch (error) {
    //     console.log('error updating user', error);
    //   }
    // })
  }

  calcTotalPooTime(duration) {
    this.user.totalPooTime += duration
  }

  calcTotalPoos() {
    this.user.numberOfPoos += 1;
  }

  calcPooStreak() {
    const today = moment.now();
    const lastPooDate = this.user.lastPooDate;
    if (this.user.lastPooDate !== null) {
      if (today - lastPooDate > 86400000 && today - lastPooDate < 172800000) {
        this.user.pooStreak += 1;
        this.user.lastPooDate = moment.now();
      } else {
        this.user.pooStreak = 1;
        this.user.lastPooDate = moment.now();
      }
    } else {
      this.user.pooStreak = 1;
      this.user.lastPooDate = moment.now();
    }
  }

  calcLongestPooTime(duration) {
    if (duration > this.user.longestPooTime) {
      this.user.longestPooTime = duration;
    }
    if (this.user.shortestPooTime === null) {
      this.user.shortestPooTime = duration;
    }
  }

  calcShortestPooTime(duration) {
    if (duration < this.user.shortestPooTime) {
      this.user.shortestPooTime = duration;
    }
  }

  calcTotalPaid() {
    console.log('user', this.user)
    console.log('stoptimeraw', this.dataService.stopTimeRaw)
    if (this.user.hourlyRate) {
      console.log('userTotalPooTime', this.user.totalPooTime)
      const time = this.user.totalPooTime;
      this.user.totalPaid = (this.user.hourlyRate / 3600) * time;
    } else {
      this.user.totalPaid = 0;
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
