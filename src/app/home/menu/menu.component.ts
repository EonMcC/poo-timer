import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class Menu implements OnChanges {

    @Input() menuClick: boolean;
    @Input() environment: Environment

  constructor(
      private menu: MenuController,
      private router: Router,
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

  navigateTo(route){
    this.menu.close('first');
    this.router.navigate([route]);
  }

  handleSignOut(){
    this.menu.close('first');
    // Auth.signOut().then(() => {
    //   this.router.navigate(['/auth'])
    // })
  }

}