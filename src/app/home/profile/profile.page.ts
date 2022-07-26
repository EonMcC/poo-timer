import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment } from 'src/app/services/environment-storage.service';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';
import { User } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  environment: Environment
  totalPaid: string;
  firstTimeDate: string;
  totalTimeMs: number;
  items: Array<Item>;

  constructor(
      private router: Router,
      private dataService: DataServiceService,
      private itemStorageService: ItemStorageService
    ) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.environment = this.dataService.environment;
    this.getTimes();
    this.calculateSignupDate();
  }

  getTimes(){
    this.itemStorageService.getItems().then((items) => {
      this.totalTimeMs = 0;
      if (items && items.length > 0) {
        this.items = items.filter((item) => {
          return item.environmentID === this.dataService.environment.id;
        })
        if (this.items.length > 0) {
          this.items.forEach((item) => {
            this.totalTimeMs += item.duration * 1000
          });
          this.calculateTotalPaid();
        }
      }
    })
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  calculateSignupDate() {
    if(this.environment.firstTimeDate !== null) {
      this.firstTimeDate = moment(this.environment.firstTimeDate).format('MMM \'YY');
    }
  }

  calculateTotalPaid() {
    const symbol = this.environment.currency.slice(0,1);
    const totalPaid = (this.totalTimeMs / (1000 * 60 * 60)) * this.environment.hourlyRate;
    this.totalPaid = symbol + totalPaid.toFixed(2);
  }

  formatMoney(paid) {
    const currency = this.environment.currency;
    if (currency === '$ Pieces of Eight' || currency === '£ Old Money Pounds') {
      const symbol = currency.slice(0,1);
      const moneyType = currency.slice(2);
      this.totalPaid = `${symbol}${paid} ${moneyType}`
    } else {
      this.totalPaid = `${currency}${paid}`
    }
  }

}
