import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

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
