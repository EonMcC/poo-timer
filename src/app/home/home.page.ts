import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../API.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('timer') timerElement: ElementRef;

  menuClick = false;
  todos: Array<any>;
  numbers = timer(0, 1000)
  timer: any;
  formatedTime: string;
  timerRunning = false;

  constructor(
      private router: Router,
      private apiService: APIService
    ) {}

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
        if (t < 3600) {
          this.timerElement.nativeElement.classList.remove('timer-mid');
          this.timerElement.nativeElement.classList.remove('timer-long');
          this.formatedTime = new Date(t * 1000).toISOString().substr(14, 5);
        } else if (t < 36000) {
          this.timerElement.nativeElement.classList.add('timer-mid');
          this.formatedTime = new Date(t * 1000).toISOString().substr(12, 7);
        } else {
          this.timerElement.nativeElement.classList.add('timer-long');
          this.formatedTime = new Date(t * 1000).toISOString().substr(11, 8);
        }
      });
    } else {
      console.log('Stopping Timer');
      this.timerRunning = false;
      this.timer.unsubscribe();
    }
  }
}