import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../API.service.service';
import { DataServiceService } from '../home/data-service.service';
import { ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.page.html',
  styleUrls: ['./initial-setup.page.scss'],
})
export class InitialSetupPage implements OnInit {

  constructor(
    private apiService: APIService,
    private dataService: DataServiceService,
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('initial setup onInit', this.dataService.user)
  }

  onSubmit(form: NgForm) {
    const id = this.dataService.user.id;
    const name = form.value.name;
    const hourlyRate = form.value.wage;
    const currency = form.value.currency;

    console.log('id', id)
    this.apiService.UpdateUser({
      id,
      name,
      hourlyRate,
      currency,
      firstLogin: false
    }).then((data) => {
      try {
        this.presentToast();
        this.router.navigate(['/home']);
      } catch (error) {
        console.log('updateUser error', error);
      }
    })
    form.reset();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Details saved, you\'re good to go!',
      duration: 2000
    });
    toast.present();
  }

}
