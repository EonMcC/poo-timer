import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as moment from 'moment';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';
import { User } from 'src/app/services/user-storage.service';
import { Environment } from 'src/app/services/environment-storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.page.html',
  styleUrls: ['./stop.page.scss'],
})

export class StopPage implements OnInit {

  user: User;
  environment: Environment
  hours: string;
  minutes: string;
  seconds: string;
  showHours: boolean;
  showMinutes: boolean;
  paid: string;
  paidRaw: number;
  isLongest: boolean;
  items: Array<Item>


  constructor(
      public alertController: AlertController,
      private toastService: ToastService,
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService,
    ) {}

    get data():string {
      return this.dataService.stopTime;
    }

  ngOnInit() {
    this.user = this.dataService.user;
    this.environment = this.dataService.environment;
    this.dataService.stopTime.length > 5 ? this.breakDownTimeInclHours(this.dataService.stopTime) : this.breakDownTime(this.dataService.stopTime);
    this.itemStorageService.getItems().then((items) => {
      this.items = items.filter((item) => {
        return item.environmentID === this.dataService.environment.id;
      })
      this.calculateMoney(this.dataService.stopTimeRaw, this.environment.hourlyRate);
      this.isLongestTime();
    })
  }

  isLongestTime() {
    if (this.items.length > 0) {
      const curLongestTime = this.items.reduce((min, item) => item.duration > min ? item.duration : min, this.items[0].duration)
      this.isLongest = curLongestTime < this.dataService.stopTimeRaw ? true : false;
    }
  }

  calculateMoney(time, hourlyRate) {
    if (time) {
      this.paidRaw = ((hourlyRate / 3600) * time);
      if (this.paidRaw < .01) {
        const paid = this.paidRaw.toFixed(3);
        this.formatMoney(paid);
      } else {
        const paid = this.paidRaw.toFixed(2);
        this.formatMoney(paid);
      }
    }
  }

  formatMoney(paid) {
    const currency = this.environment.currency;
    if (currency === '$ Pieces of Eight' || currency === '£ Old Money Pounds') {
      const symbol = currency.slice(0,1);
      const moneyType = currency.slice(2);
      this.paid = `${symbol}${paid} ${moneyType}`
    } else {
      this.paid = `${currency}${paid}`
    }
  }

  breakDownTime(wholeTime) {
    const minutes = wholeTime.slice(0, 2);
    const seconds = wholeTime.slice(3, 5);
    
    this.arrangeText(minutes);
    
    this.minutes = minutes.slice(0,1) === '0' ? minutes.slice(1,2) : minutes.slice(0,2);
    this.seconds = seconds.slice(0,1) === '0' ? seconds.slice(1,2) : seconds.slice(0,2);
  }

  breakDownTimeInclHours(wholeTime) {
    const hours = wholeTime.slice(0, 2);
    const minutes = wholeTime.slice(3, 5);
    const seconds = wholeTime.slice(6, 8);

    this.arrangeText(minutes, hours)

    this.hours = hours.slice(0,1) === '0' ? hours.slice(1,2) : hours.slice(0,2);
    this.minutes = minutes.slice(0,1) === '0' ? minutes.slice(1,2) : minutes.slice(0,2);
    this.seconds = seconds.slice(0,1) === '0' ? seconds.slice(1,2) : seconds.slice(0,2);
  }

  arrangeText(minutes, hours?){
    if (!hours) {
      minutes === '00' ? this.showMinutes = false : this.showMinutes = true;
    } else {
      this.showMinutes = true;
      this.showHours = true;
    }
  }

  acceptTime() {
    const today = moment.now();
    const duration = this.dataService.stopTimeRaw;

    const createdAt = moment.now()
    const environmentID = this.user.activeEnvironmentID;

    this.itemStorageService.addItem({
      id: this.items.length > 0 ? this.items[0].id + 1 : 1,
      environmentID,
      duration,
      createdAt,
      worth: this.paidRaw
    }).then(() => {
      this.toastService.presentToast('Time Saved');
      this.router.navigate(['/home']);
    })
  }

  discardTime(){
    this.presentAlertConfirm().then(ans => {
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to discard this time?',
      cssClass: "alert-class",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "alert-cancel-button",
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Discard',
          cssClass: "alert-confirm-button",
          handler: () => {
            this.dataService.stopTime = null;
            this.dataService.stopTimeRaw = null;
            this.toastService.presentToast('Time Discarded');
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

}
