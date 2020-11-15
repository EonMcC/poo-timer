import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-environment-setup',
  templateUrl: './environment-setup.page.html',
  styleUrls: ['./environment-setup.page.scss'],
})
export class EnvironmentSetupPage implements OnInit {

  environments: Array<Environment>
  formValid = false;
  same = true;
  spinner = false;

  constructor(
    private environmentStorageService: EnvironmentStorageService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.environmentStorageService.listEnvironments().then((environments) => {
      this.environments = environments;
    })
  }

  onSubmit(form: NgForm) {
    this.spinner = true;
    if (form.valid) {
      const id = this.environments.length + 1;
      const name = form.value.name;
      let hourlyRate: number;
      let currency: string;
      if (form.value.same) {
        hourlyRate = this.environments[0].hourlyRate;
        currency = this.environments[0].currency;
      } else {
        hourlyRate = form.value.hourlyRate;
        currency = form.value.currency;
      }
      this.environmentStorageService.addEnvironment({
        id,
        name,
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
        streak: 0,
        startTime: 0,
        currentTime: 0
      }).then(() => {
        this.spinner = false;
        this.router.navigate(['/environment-select'])
        this.formValid = true;
      })
      form.reset();
    } else {
      this.spinner = false;
      this.toastService.presentToast('Please fill in all information');
    }
  }

}
