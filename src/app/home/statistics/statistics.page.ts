import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService, User } from '../data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  user: User
  totalPooTime: string;
  totalPaid: string;
  shortestPooFormated: string;
  longestPooFormated: string;

  constructor(
    private router: Router,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.formatTotalPooTime();
    this.calculateTotalPaid();
    this.formatShortestPoo();
    this.formatLongestPoo();
  }

  formatTotalPooTime() {
    const t = this.user.totalPooTime;
    if (t < 3600) {
      this.totalPooTime = new Date(t * 1000).toISOString().substr(14, 5);
    } else {
      this.totalPooTime = new Date(t * 1000).toISOString().substr(11, 8);
    }
  }

  calculateTotalPaid() {
    const t = (this.user.totalPooTime / 3600).toFixed(2);
    const symbol = this.user.currency.slice(0,1);
    this.totalPaid = symbol + t;
  }

  formatShortestPoo() {
    const t = this.user.shortestPooTime;
    if (t < 3600) {
      this.shortestPooFormated = new Date(t * 1000).toISOString().substr(14, 5);
    } else {
      this.shortestPooFormated = new Date(t * 1000).toISOString().substr(11, 8);
    }
  }

  formatLongestPoo() {
    const t = this.user.longestPooTime;
    if (t < 3600) {
      this.longestPooFormated = new Date(t * 1000).toISOString().substr(14, 5);
    } else {
      this.longestPooFormated = new Date(t * 1000).toISOString().substr(11, 8);
    }
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
