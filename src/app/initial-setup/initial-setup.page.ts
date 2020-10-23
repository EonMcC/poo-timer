import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/user-storage.service';
import * as moment from 'moment';
import { EnvironmentStorageService } from '../services/environment-storage.service';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.page.html',
  styleUrls: ['./initial-setup.page.scss'],
})
export class InitialSetupPage implements OnInit {

  constructor(
    public toastController: ToastController,
    private router: Router,
    private userStorageService: UserStorageService,
    private environmentStorageService: EnvironmentStorageService,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    if (this.dataService.environment) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userName = form.value.name || 'User';
      const signupDate = moment.now();
      const hourlyRate = form.value.wage || null;
      const currency = form.value.currency || null;
  
      this.userStorageService.addUser({userName, signupDate, activeEnvironmentID: 1}).then((user) => {
        this.dataService.user = user;
        this.environmentStorageService.addEnvironment({
          id: 1,
          name: 'Poo',
          firstTimeDate: null,
          hourlyRate,
          currency,
          longestTime: 0,
          shortestTime: 0,
          totalTime: 0,
          itemCount: 0,
          totalPaid: 0,
          lastItemID: 0,
          lastTimeDate: null,
          streak: null
        }).then((env) => {
          this.dataService.environment = env[0];
          this.presentToast('Details saved, you\'re good to go!');
          this.router.navigate(['/home'])
        })
      })
      form.reset();
    } else {
      this.presentToast('Please fill in all information');
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
