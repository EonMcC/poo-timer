import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService, User } from '../data-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;

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
