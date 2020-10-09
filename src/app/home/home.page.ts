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

  menuClick = false;
  todos: Array<any>;
  numbers = timer(0, 1000)
  timer: any;
  unformatedTime: any;
  formatedTime = '00:00';
  timerRunning = false;

  constructor(
      private router: Router,
      private dataService: DataServiceService,
      private apiService: APIService
    ) {}

    ngOnInit() {
      Auth.currentAuthenticatedUser().then((data) => { 
        console.log('data', data)
        const id = data.attributes.sub;
        this.apiService.GetUser(id).then((user) => {
          console.log('Current User', user)
          this.dataService.user = {
            id: user.id,
            email: user.email,
            hourlyRate: user.hourlyRate,
            currency: user.currency
          }
          console.log('userin service', this.dataService.user);
        })
      })
    }

  set data(value: string) {
    this.dataService.stopTime = value;
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
      });
    } else {
      console.log('Stopping Timer');
      this.timerRunning = false;
      this.timer.unsubscribe();
      this.dataService.stopTimeRaw = this.unformatedTime;
      this.dataService.stopTime = this.formatedTime;
      this.router.navigate(['/home/stop'])
      this.formatedTime = '00:00'
    }
  }
}