import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../API.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  menuClick = false;
  todos: Array<any>;

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

  // sendToDB(){
  //   this.apiService.CreatePooTimer({
  //   title: 'Start Timer'
  //   })
  // }
}