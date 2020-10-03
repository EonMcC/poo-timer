import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  menuClick = false;

  constructor(private router: Router) {}

  openMenu(){
    this.menuClick = true;
    setTimeout(() => {
      this.menuClick = false;
    }, 500)
  }

  go(){
    this.router.navigate(['profile'])
  }
}
