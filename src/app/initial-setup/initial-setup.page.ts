import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/user-storage.service';
import * as moment from 'moment';
import { EnvironmentStorageService } from '../services/environment-storage.service';
import { DataServiceService } from '../services/data-service.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.page.html',
  styleUrls: ['./initial-setup.page.scss'],
})
export class InitialSetupPage implements OnInit {

  spinner = false;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private userStorageService: UserStorageService,
    private environmentStorageService: EnvironmentStorageService,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    if (this.dataService.environment) {
      this.router.navigate(['']);
    }
  }

  onSubmit(form: NgForm) {
    this.spinner = true;
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
          startTime: 0,
          currentTime: 0
        }).then((env) => {
          this.dataService.environment = env[0];
          this.toastService.presentToast('Details saved, you\'re good to go!');
          this.spinner = false;
          this.router.navigate([''])
        })
      })
      form.reset();
    } else {
      this.spinner = false;
      this.toastService.presentToast('Please fill in all information');
    }
  }

}
