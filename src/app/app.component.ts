import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataServiceService } from './services/data-service.service';
import { UserStorageService } from './services/user-storage.service';
import { Environment, EnvironmentStorageService } from './services/environment-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService,
    private environmentStorageService: EnvironmentStorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.userStorageService.getUser().then((user) => {
        if (user) {
          this.dataService.user = user;
          this.environmentStorageService.listEnvironments().then((data) => {
            data.forEach((environment) => {
              if (environment.id === this.dataService.user.activeEnvironmentID) {
                this.dataService.environment = environment;
                this.splashScreen.hide();
              }
            })
          })
        }
      })
    });
  }
}
