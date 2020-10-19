import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/user-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.page.html',
  styleUrls: ['./initial-setup.page.scss'],
})
export class InitialSetupPage implements OnInit {

  constructor(
    public toastController: ToastController,
    private router: Router,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const userName = form.value.name;
    const hourlyRate = form.value.wage;
    const currency = form.value.currency;
    const signupDate = moment.now();

    this.userStorageService.addUser({id: 1, userName, hourlyRate, currency, signupDate}).then((user) => {
      console.log('signedUpUser', user);
      this.presentToast();
      this.router.navigate(['/home'])
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
