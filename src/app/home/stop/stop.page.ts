import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as moment from 'moment';
import { ItemStorageService } from 'src/app/services/item-storage.service';
import { User, UserStorageService } from 'src/app/services/user-storage.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
      public toastController: ToastController,
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService,
      private userStorageService: UserStorageService,
      private environmentStorageService: EnvironmentStorageService
    ) { }

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
    this.calcTotalPoos();
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
      console.log('returnedPoo', poo);
      this.presentToast('Time Saved');
      this.router.navigate(['/home']);
    })
  }

  calcTotalPooTime(duration) {
    this.environment.totalTime += duration
  }

  calcTotalPoos() {
    this.environment.itemCount += 1;
  }

  calcStreak(date) {
    if (this.environment.lastTimeDate !== null) {
      const lastTimeDate = moment(this.environment.lastTimeDate).startOf('day');
      const today = moment(date).startOf('day');
      const diffTime = today.diff(lastTimeDate, 'days');
      if (diffTime > 0) {
        this.environment.streak += 1;
      } else {
        this.environment.streak = 1;
      }
    } else {
      this.environment.streak = 1;
    }
  }

  calcLongestPooTime(duration) {
    if (duration > this.environment.longestTime) {
      this.longestTime = duration;
      // this.environment.longestTime = duration;
    }
    if (this.environment.shortestTime === null) {
      this.shortestTime = duration;
      // this.environment.shortestTime = duration;
    }
  }

  calcShortestPooTime(duration) {
    if (duration < this.environment.shortestTime) {
      this.shortestTime = duration;
      // this.environment.shortestTime = duration;
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
            this.presentToast('Time Discarded');
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        position: 'top',
        duration: 2000
      });
      toast.present();
    }

}
