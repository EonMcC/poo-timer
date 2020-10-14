import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService, User } from '../data-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  user: User

  constructor(
    private router: Router,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    this.user = this.dataService.user;
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
