import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class Menu implements OnChanges {

    @Input() menuClick: boolean;

  constructor(
      private menu: MenuController,
      private router: Router
    ) {}

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menuClick && this.menuClick === true) {
        this.openFirst();
    }
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  goToProfile(){
    this.menu.close('first');
    this.router.navigate(['/home/profile'])
  }

  handleSignOut(){
    this.menu.close('first');
    Auth.signOut().then(() => {
      this.router.navigate(['/auth'])
    })
  }

}