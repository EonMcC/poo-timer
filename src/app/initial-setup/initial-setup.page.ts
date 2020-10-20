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
  }

  onSubmit(form: NgForm) {
    const userName = form.value.name || 'User';
    const signupDate = moment.now();
    const hourlyRate = form.value.wage || null;
    const currency = form.value.currency || null;

    this.userStorageService.addUser({userName, signupDate, activeEnvironmentID: 1}).then((user) => {
      console.log('signedUpUser', user);
      this.dataService.user = user;
      this.environmentStorageService.addEnvironment({
        id: 1,
        name: 'poo-timer',
        firstTimeDate: null,
        hourlyRate,
        currency,
        longestTime: 0,
        shortestTime: 0,
        totalTime: 0,
        itemCount: 0,
        totalPaid: 0,
        lastItemID: 0
      }).then((env) => {
        this.dataService.environment = env[0];
        this.presentToast();
        this.router.navigate(['/home'])
      })
    })
    form.reset();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Details saved, you\'re good to go!',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
