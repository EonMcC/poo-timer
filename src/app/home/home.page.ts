import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimeoutError, timer } from 'rxjs';
import { DataServiceService } from '../services/data-service.service';
import * as moment from 'moment';
import { ItemStorageService } from '../services/item-storage.service';
import { UserStorageService } from '../services/user-storage.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Environment, EnvironmentStorageService } from '../services/environment-storage.service';


export interface stopData {
  stopTime: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild('timer') timerElement: ElementRef;
  @ViewChild('paid') paidElement: ElementRef;

  menuClick = false;
  todos: Array<any>;
  numbers = timer(0, 1000)
  timer: any;
  unformatedTime: any;
  formatedTime = '00:00';
  timerRunning = false;
  paid: string;
  environment: Environment

  constructor(
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService,
      private userStorageService: UserStorageService,
      private splashScreen: SplashScreen,
      private environmentStorageService: EnvironmentStorageService
    ) {}

    ngOnInit() {
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
      console.log('Starting Timer');
      this.timer = this.numbers.subscribe(t => {
        console.log(t)
        this.unformatedTime = t;
        if (t < 3600) {
          this.timerElement.nativeElement.classList.remove('timer-long');
          this.formatedTime = new Date(t * 1000).toISOString().substr(14, 5);
        } else {
          this.timerElement.nativeElement.classList.add('timer-long');
          this.formatedTime = new Date(t * 1000).toISOString().substr(11, 8);
        }
        if (this.dataService.environment.hourlyRate) {
          this.calculateMoney(t)
        }
      });
    } else {
      console.log('Stopping Timer');
      this.timerRunning = false;
      this.timer.unsubscribe();
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