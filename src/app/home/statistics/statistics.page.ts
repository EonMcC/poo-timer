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
    const time = this.environment.totalTime;
    if (time < 3600) {
      this.totalTime = new Date(time * 1000).toISOString().substr(14, 5);
    } else {
      this.totalTime = new Date(time * 1000).toISOString().substr(11, 8);
    }
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
