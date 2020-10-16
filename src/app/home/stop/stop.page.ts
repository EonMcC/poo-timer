import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { DataServiceService } from '../data-service.service';
import * as moment from 'moment';
import { APIService } from 'src/app/API.service.service';

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
      private apiService: APIService
    ) { }

    get data():string {
      return this.dataService.stopTime;
    }

  ngOnInit() {
    this.user = this.dataService.user;
    this.dataService.stopTime.length > 5 ? this.breakDownTimeInclHours(this.dataService.stopTime) : this.breakDownTime(this.dataService.stopTime);
    
    this.calculateMoney(this.dataService.stopTimeRaw, this.user.hourlyRate);
  }

  calculateMoney(time, hourlyRate) {
    console.log('time', time);
    console.log('hourlyRate', hourlyRate)
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
    if (currency === '£ Unicorn Dust' || currency === '$ Pieces of Eight' || currency === '£ Old Money') {
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
    this.calcTotalPooTime(duration);
    this.calcTotalPoos();
    this.calcPooStreak();
    this.calcLongestPooTime(duration);
    this.calcShortestPooTime(duration);
    this.calcTotalPaid(duration);
    console.log('this.user', this.user)
    this.apiService.UpdateUser({
      id: this.user.id,
      longestPooTime: this.user.longestPooTime,
      shortestPooTime: this.user.shortestPooTime,
      numberOfPoos: this.user.numberOfPoos,
      totalPooTime: this.user.totalPooTime,
      lastPooDate: this.user.lastPooDate,
      pooStreak: this.user.pooStreak
    }).then((data) => {
      try {
        this.presentToast('save');
        this.router.navigate(['/home']);
      } catch (error) {
        console.log('error updating user', error);
      }
    })
  }

  calcTotalPooTime(duration) {
    this.user.totalPooTime += duration
  }

  calcTotalPoos() {
    this.user.numberOfPoos += 1;
  }

  calcPooStreak() {
    const createdAt = moment.now();
    const today = moment().dayOfYear(createdAt);
    const lastPooDate = this.user.lastPooDate;
    if (lastPooDate !== null) {
      if (today === lastPooDate + 1) {
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

  calcTotalPaid(duration) {
    const time = duration / 3600;
    this.user.totalPaid = this.user.totalPaid += (time * this.user.hourlyRate);
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
            console.log('Confirm Okay');
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
    console.log('action', action)
    if (action === 'discard') {
      console.log('1')
      const toast = await this.toastController.create({
        message: 'Poo Discarded',
        duration: 2000
      });
      toast.present();
    } else if (action === 'save') {
      console.log('2')
      const toast = await this.toastController.create({
        message: 'Poo Saved',
        duration: 2000
      });
      toast.present();
    }
  }

}
