import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import * as moment from 'moment';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  environment: Environment
  totalTime: string;
  hours = '0 hrs';
  minutes = '0 mins';
  seconds = '0 secs';
  totalPaid: string;
  shortestTimeFormated: string;
  longestTimeFormated: string;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private environmentStorageService: EnvironmentStorageService
  ) { }

  ngOnInit() {
    this.environment = this.dataService.environment
    this.formatTotalTime();
    this.calculateTotalPaid();
    this.formatShortestTime();
    this.formatLongestTime();
  }

  formatTotalTime() {
    const time = this.environment.totalTime * 1000;
    const digitalTime = new Date(time).toISOString().substr(11, 8);
    
    const hours = digitalTime[0] === '0' ? digitalTime.substr(1, 1) : digitalTime.substr(0, 2);
    const minutes = digitalTime[3] === '0' ? digitalTime.substr(4, 1) : digitalTime.substr(3, 2);
    const seconds = digitalTime[6] === '0' ? digitalTime.substr(7, 1) : digitalTime.substr(6, 2);

    this.hours = hours.length === 1 && hours[0] === '1' ? hours + ' hr' : hours + ' hrs';
    this.minutes = minutes.length === 1 && minutes[0] === '1' ? minutes + ' min' : minutes + ' mins';
    this.seconds = seconds.length === 1 && seconds[0] === '1' ? seconds + ' sec' : seconds + ' secs';
  }

  calculateTotalPaid() {
    const symbol = this.environment.currency.slice(0,1);
    if (this.environment.totalPaid) {
      const total = this.environment.totalPaid.toFixed(2);
      this.totalPaid = symbol + total;
    } else {
      this.totalPaid = symbol + 0;
    }
  }

  formatShortestTime() {
    const time = this.environment.shortestTime;
    if (time < 3600) {
      this.shortestTimeFormated = new Date(time * 1000).toISOString().substr(14, 5);
    } else {
      this.shortestTimeFormated = new Date(time * 1000).toISOString().substr(11, 8);
    }
  }

  formatLongestTime() {
    const time = this.environment.longestTime;
    if (time < 3600) {
      this.longestTimeFormated = new Date(time * 1000).toISOString().substr(14, 5);
    } else {
      this.longestTimeFormated = new Date(time * 1000).toISOString().substr(11, 8);
    }
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
