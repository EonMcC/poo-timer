import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../API.service.service';
import { timer } from 'rxjs';
import { DataServiceService } from './data-service.service';
import { Auth } from 'aws-amplify';
import * as moment from 'moment';


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

  constructor(
      private router: Router,
      private dataService: DataServiceService,
      private apiService: APIService
    ) {}

    ngOnInit() {
      Auth.currentAuthenticatedUser().then((data) => { 
        const id = data.attributes.sub;
        this.apiService.GetUser(id).then((user) => {
          this.dataService.user = user;
          console.log('firstuser', this.dataService.user)
          this.setPaid();
        })
      })
    }

  set data(value: string) {
    this.dataService.stopTime = value;
  }

  setPaid() {
    if (this.dataService.user.currency) {
      this.paid = this.dataService.user.currency.slice(0,1) + 0;
    }
  }

  openMenu(){
    this.menuClick = true;
    setTimeout(() => {
      this.menuClick = false;
    }, 500)
    const now = moment.now();
    console.log(now)
    // this.saveToDb();
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
        this.calculateMoney(t)
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
    const hourlyRate = this.dataService.user.hourlyRate;
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
    const currency = this.dataService.user.currency;
    this.paid = `${currency.slice(0,1)}${paid}`
  }
}