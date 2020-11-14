import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimeoutError, timer } from 'rxjs';
import { DataServiceService } from '../services/data-service.service';
import * as moment from 'moment';
import { Environment, EnvironmentStorageService } from '../services/environment-storage.service';

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
    private environmentStorageService: EnvironmentStorageService
  ) {}

  ionViewWillEnter() {
    this.getData();
  }

  ionViewWillLeave() {
    clearInterval(this.intervalFn);
  }

  getData() {
    if (this.dataService.user) {
      this.environment = this.dataService.environment;
      if (this.environment.startTime !== 0) {
        this.continueTimer();
      }
    } else {
      this.router.navigate(['/initial-setup'])
    }
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

  continueTimer() {
    this.timerRunning = true;
    if (this.environment.startTime === 0) {
      this.environment.startTime = moment.now();
      this.environmentStorageService.updateEnvironment(this.environment);
    }
    this.intervalFn = setInterval(() => {
      this.unformatedTime = ((moment.now() - this.environment.startTime) / 1000).toFixed(0);
      this.environment.currentTime = this.unformatedTime;
      if (this.unformatedTime < 3600) {
        this.timerElement.nativeElement.classList.remove('timer-long');
        this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(14, 5);
      } else {
        this.timerElement.nativeElement.classList.add('timer-long');
        this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(11, 8);
      }
      if (this.environment.hourlyRate) {
        this.calculateMoney(this.unformatedTime)
      }
    }, 1000);
  }

  handleTimer(){
    if (this.timerRunning === false) {
      this.timerRunning = true;
      if (this.environment.startTime === 0) {
        this.environment.startTime = moment.now();
        this.environmentStorageService.updateEnvironment(this.environment);
      }
      this.intervalFn = setInterval(() => {
        this.unformatedTime = ((moment.now() - this.environment.startTime) / 1000).toFixed(0);
        this.environment.currentTime = this.unformatedTime;
        if (this.unformatedTime < 3600) {
          this.timerElement.nativeElement.classList.remove('timer-long');
          this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(14, 5);
        } else {
          this.timerElement.nativeElement.classList.add('timer-long');
          this.formatedTime = new Date(this.unformatedTime * 1000).toISOString().substr(11, 8);
        }
        if (this.environment.hourlyRate) {
          this.calculateMoney(this.unformatedTime)
        }
      }, 1000);
    } else {
      this.timerRunning = false;
      this.dataService.stopTimeRaw = parseFloat(this.unformatedTime);
      this.dataService.stopTime = this.formatedTime;
      clearInterval(this.intervalFn);
      this.environment.startTime = 0;
      this.environment.currentTime = 0;
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