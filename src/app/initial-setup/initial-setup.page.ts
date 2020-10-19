import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.page.html',
  styleUrls: ['./initial-setup.page.scss'],
})
export class InitialSetupPage implements OnInit {

  constructor(
    private dataService: DataServiceService,
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('initial setup onInit', this.dataService.user)
  }

  onSubmit(form: NgForm) {
    console.log('on submit')
    const id = this.dataService.user.id;
    const name = form.value.name;
    const hourlyRate = form.value.wage;
    const currency = form.value.currency;

    console.log('id', id)
    // this.apiService.UpdateUser({
    //   id,
    //   name,
    //   hourlyRate,
    //   currency,
    //   firstLogin: false
    // }).then((data) => {
    //   try {
    //     this.dataService.user.currency = currency ? currency : null,
    //     this.dataService.user.hourlyRate = hourlyRate ? hourlyRate : null,
    //     this.dataService.user.name = name ? name : 'User',
    //     this.presentToast();
    //     this.router.navigate(['/home']);
    //   } catch (error) {
    //     console.log('updateUser error', error);
    //   }
    // })
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

  handleClick() {
    console.log('click')
  }

}
