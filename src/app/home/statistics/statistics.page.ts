import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {

  times: Array<Item> = [];
  totalTimeMs = 0;
  environment: Environment
  totalTime: string;
  hours: string;
  minutes: string;
  seconds: string;
  totalPaid: string;
  shortestHours: string;
  shortestMinutes: string;
  shortestSeconds: string;
  longestHours: string;
  longestMinutes: string;
  longestSeconds: string;
  streak: number;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private itemStorageService: ItemStorageService
  ) { }

  ionViewWillEnter() {
    this.environment = this.dataService.environment;
    this.getTimes();
  }

  getTimes(){
    this.itemStorageService.getItems().then((items) => {
      this.totalTimeMs = 0;
      if (items && items.length > 0) {
        this.times = items.filter((item) => {
          return item.environmentID === this.dataService.environment.id;
        })
        this.times.reverse();
        if (this.times.length > 0) {
          this.times.forEach((item) => {
            this.totalTimeMs += item.duration * 1000
          });
          this.formatTotalTime();
          this.calculateTotalPaid();
          this.formatShortestTime();
          this.formatLongestTime();
          this.calcStreak();
        }
      }
    })
  }

  formatTotalTime() {
    const digitalTime = new Date(this.totalTimeMs).toISOString().substr(11, 8);

    const hours = digitalTime[0] === '0' ? digitalTime.substr(1, 1) : digitalTime.substr(0, 2);
    const minutes = digitalTime[3] === '0' ? digitalTime.substr(4, 1) : digitalTime.substr(3, 2);
    const seconds = digitalTime[6] === '0' ? digitalTime.substr(7, 1) : digitalTime.substr(6, 2);

    this.hours = hours.length === 1 && hours[0] === '1' ? hours + ' hr' : hours + ' hrs';
    this.minutes = minutes.length === 1 && minutes[0] === '1' ? minutes + ' min' : minutes + ' mins';
    this.seconds = seconds.length === 1 && seconds[0] === '1' ? seconds + ' sec' : seconds + ' secs';
  }

  calculateTotalPaid() {
    const symbol = this.environment.currency.slice(0,1);
    const totalPaid = (this.totalTimeMs / (1000 * 60 * 60)) * this.environment.hourlyRate;
    this.totalPaid = symbol + totalPaid.toFixed(2);
  }

  formatShortestTime() {
    const rawTime = this.times.reduce((min, item) => item.duration < min ? item.duration : min, this.times[0].duration)
    const digitalTime = new Date(rawTime * 1000).toISOString().substr(11, 8);
    
    const hours = digitalTime[0] === '0' ? digitalTime.substr(1, 1) : digitalTime.substr(0, 2);
    const minutes = digitalTime[3] === '0' ? digitalTime.substr(4, 1) : digitalTime.substr(3, 2);
    const seconds = digitalTime[6] === '0' ? digitalTime.substr(7, 1) : digitalTime.substr(6, 2);

    this.shortestHours = hours.length === 1 && hours[0] === '1' ? hours + ' hr' : hours + ' hrs';
    this.shortestMinutes = minutes.length === 1 && minutes[0] === '1' ? minutes + ' min' : minutes + ' mins';
    this.shortestSeconds = seconds.length === 1 && seconds[0] === '1' ? seconds + ' sec' : seconds + ' secs';
  }

  formatLongestTime() {
    const rawTime = this.times.reduce((min, item) => item.duration > min ? item.duration : min, this.times[0].duration)

    const digitalTime = new Date(rawTime * 1000).toISOString().substr(11, 8);
    
    const hours = digitalTime[0] === '0' ? digitalTime.substr(1, 1) : digitalTime.substr(0, 2);
    const minutes = digitalTime[3] === '0' ? digitalTime.substr(4, 1) : digitalTime.substr(3, 2);
    const seconds = digitalTime[6] === '0' ? digitalTime.substr(7, 1) : digitalTime.substr(6, 2);

    this.longestHours = hours.length === 1 && hours[0] === '1' ? hours + ' hr' : hours + ' hrs';
    this.longestMinutes = minutes.length === 1 && minutes[0] === '1' ? minutes + ' min' : minutes + ' mins';
    this.longestSeconds = seconds.length === 1 && seconds[0] === '1' ? seconds + ' sec' : seconds + ' secs';
  }

  calcStreak() {
    const dates = [];
    this.times.forEach((item) => {
      dates.push(moment(item.createdAt).startOf('day'))
    })

    let streak = 0;
    if (moment().isSame(dates[0], 'day')) {
      streak = 1;
      let curDate = moment(new Date()).startOf('day');
      dates.forEach((date) => {
        const diffTime = curDate.diff(date, 'days');
        if (diffTime === 1) {
          streak += 1;
          curDate = date;
        } else {
          streak = streak;
        }
      })
    }
    this.streak = streak;
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
