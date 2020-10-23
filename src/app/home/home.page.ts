import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimeoutError, timer } from 'rxjs';
import { DataServiceService } from '../services/data-service.service';
import * as moment from 'moment';
import { ItemStorageService } from '../services/item-storage.service';
import { UserStorageService } from '../services/user-storage.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Environment, EnvironmentStorageService } from '../services/environment-storage.service';
import { Time } from '@angular/common';


export interface stopData {
  stopTime: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('timer') timerElement: ElementRef;
  @ViewChild('paid') paidElement: ElementRef;

  menuClick = false;
  todos: Array<any>;
  numbers = timer(0, 1000)
  timerStartMoment: number;
  momentStart: number;
  momentEnd: number;
  timer: any;
  unformatedTime: any;
  formatedTime = '00:00';
  timerRunning = false;
  paid: string;
  environment: Environment
  intervalFn: NodeJS.Timer;

  constructor(
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService,
      private userStorageService: UserStorageService,
      private splashScreen: SplashScreen,
      private environmentStorageService: EnvironmentStorageService
    ) {}

    ionViewWillEnter() {
      this.getUser();
    }

    getUser() {
      this.userStorageService.getUser().then((user) => {
        if (user) {
          this.dataService.user = user;
          this.environmentStorageService.listEnvironments().then((data) => {
            data.forEach((environment) => {
              if (environment.id === this.dataService.user.activeEnvironmentID) {
                this.environment = environment;
                this.dataService.environment = environment;
              }
            })
          })
        } else {
          this.router.navigate(['/initial-setup'])
        }
      })
    }

    clear() {
      console.log('clear')
      this.userStorageService.clearItems()
    }


  set data(value: string) {
    this.dataService.stopTime = value;
  }

  setPaid() {
    if (this.dataService.environment.currency) {
      this.paid = this.dataService.environment.currency.slice(0,1) + 0;
    }
  }

  openMenu(){
    this.menuClick = true;
    setTimeout(() => {
      this.menuClick = false;
    }, 500)
  }

  handleTimer(){
    if (this.timerRunning === false) {
      this.timerRunning = true;
      this.dataService.startTime = moment.now();
      this.intervalFn = setInterval(() => {
        this.unformatedTime = ((moment.now() - this.dataService.startTime) / 1000).toFixed(0);
        console.log('unformatedTime', this.unformatedTime)
        if (this.unformatedTime < 3600) {
          this.timerElement.nativeElement.classList.remove('timer-long');
          this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(14, 5);
        } else {
          this.timerElement.nativeElement.classList.add('timer-long');
          this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(11, 8);
        }
        if (this.dataService.environment.hourlyRate) {
          this.calculateMoney(this.unformatedTime)
        }
      }, 1000);

      // this.timer = this.numbers.subscribe(t => {
      //   console.log(t)
      //   let startTime = 0;
      //   if (moment.now() - this.timerStartMoment > 1500) {
      //     console.log('greater')
      //     startTime = moment.now() - this.timerStartMoment
      //   }
      //   this.unformatedTime = t + ( startTime / 1000);
      //   console.log('unfor', this.unformatedTime)

      //   this.momentEnd = startTime;

      //   if (this.unformatedTime < 3600) {
      //     this.timerElement.nativeElement.classList.remove('timer-long');
      //     this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(14, 5);
      //   } else {
      //     this.timerElement.nativeElement.classList.add('timer-long');
      //     this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(11, 8);
      //   }
      //   if (this.dataService.environment.hourlyRate) {
      //     this.calculateMoney(this.unformatedTime)
      //   }
      // });
    } else {
      console.log('Stopping Timer');
      this.timerRunning = false;
      // this.timer.unsubscribe();
      clearInterval(this.intervalFn);
      this.dataService.stopTimeRaw = this.unformatedTime;
      this.dataService.stopTime = this.formatedTime;
      this.router.navigate(['/home/stop'])
      this.formatedTime = '00:00'
      this.setPaid();
    }
  }

  calculateMoney(time) {
    const hourlyRate = this.dataService.environment.hourlyRate;
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
    const currency = this.dataService.environment.currency;
    this.paid = `${currency.slice(0,1)}${paid}`
  }
}