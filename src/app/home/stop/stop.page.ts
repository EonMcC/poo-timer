import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as moment from 'moment';
import { ItemStorageService } from 'src/app/services/item-storage.service';
import { User, UserStorageService } from 'src/app/services/user-storage.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

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
  longestTime = null;
  shortestTime = null;
  firstTime = false;


  constructor(
      public alertController: AlertController,
      private toastService: ToastService,
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService,
      private environmentStorageService: EnvironmentStorageService,
      private adMobFree: AdMobFree
    ) {}

    get data():string {
      return this.dataService.stopTime;
    }

  ngOnInit() {
    this.user = this.dataService.user;
    this.environment = this.dataService.environment;
    this.ifFirstTime();
    this.calcLongestPooTime(this.dataService.stopTimeRaw);
    this.calcShortestPooTime(this.dataService.stopTimeRaw);
    this.dataService.stopTime.length > 5 ? this.breakDownTimeInclHours(this.dataService.stopTime) : this.breakDownTime(this.dataService.stopTime);
    this.calculateMoney(this.dataService.stopTimeRaw, this.environment.hourlyRate);
  }

  ifFirstTime() {
    if(!this.environment.firstTimeDate) {
      this.firstTime = true;
    }
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
    const today = moment.now();
    const duration = this.dataService.stopTimeRaw;
    this.calcTotals(duration);
    this.calcStreak(today);

    if (this.firstTime) {
      this.environment.firstTimeDate = today;
    }
    if (this.longestTime !== null) {
      this.environment.longestTime = this.longestTime;
    }
    if (this.shortestTime !== null) {
      this.environment.shortestTime = this.shortestTime;
    }
    this.environment.lastTimeDate = today;
    this.environment.lastItemID += 1;
    this.environment.startTime = 0;


    this.environmentStorageService.updateEnvironment(this.environment)


    this.calcShortestPooTime(duration);
    this.calcTotalPaid();
    const createdAt = moment.now()

    const environmentID = this.user.activeEnvironmentID;

    const isLongest = this.longestTime ? true : false;
    const isShortest = this.shortestTime ? true : false;

    this.itemStorageService.addItem({
      id: this.environment.lastItemID,
      environmentID,
      duration,
      createdAt,
      worth: this.paidRaw,
      isLongest,
      isShortest
    }).then((poo) => {
      this.toastService.presentToast('Time Saved');
      this.router.navigate(['/home']);
    })
  }

  calcTotals(duration) {
    this.environment.totalTime += duration
    this.environment.itemCount += 1;
    this.environment.totalPaid = this.environment.totalPaid += this.paidRaw;
  }

  calcStreak(date) {
    if (this.environment.lastTimeDate !== null) {
      const lastTimeDate = moment(this.environment.lastTimeDate).startOf('day');
      const today = moment(date).startOf('day');
      const diffTime = today.diff(lastTimeDate, 'days');
      if (diffTime > 0 && diffTime < 2) {
        this.environment.streak += 1;
      } else if (diffTime === 0) {
        this.environment.streak = this.environment.streak;
      }  else {
        this.environment.streak = 1;
      }
    } else {
      this.environment.streak = 1;
    }
  }

  calcLongestPooTime(duration) {
    if (duration > this.environment.longestTime) {
      this.longestTime = duration;
    }
    if (this.environment.shortestTime === 0) {
      this.shortestTime = duration;
    }
  }

  calcShortestPooTime(duration) {
    if (duration < this.environment.shortestTime) {
      this.shortestTime = duration;
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
      header: 'Confirm!',
      message: 'Do you want to discard this time?',
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
          text: 'Discard',
          cssClass: "alert-confirm-button",
          handler: () => {
            this.dataService.stopTime = null;
            this.dataService.stopTimeRaw = null;
            this.toastService.presentToast('Time Discarded');
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

}
