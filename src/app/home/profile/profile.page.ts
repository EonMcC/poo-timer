import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment } from 'src/app/services/environment-storage.service';
import { User } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  environment: Environment
  grandTotal: string;
  firstTimeDate: string;

  constructor(
      private router: Router,
      private dataService: DataServiceService
    ) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.environment = this.dataService.environment;
    this.calculateGrandTotal();
    this.calculateSignupDate();
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  calculateSignupDate() {
    if(this.environment.firstTimeDate !== null) {
      this.firstTimeDate = moment(this.environment.firstTimeDate).format('MMM \'YY');
    }
  }

  calculateGrandTotal() {
    const paid = this.environment.totalPaid;
    if (paid) {
      if (paid < .01) {
        const paidNumber = paid.toFixed(3);
        this.formatMoney(paidNumber);
      } else {
        const paidNumber = paid.toFixed(2);
        this.formatMoney(paidNumber);
      }
    } else {
      this.grandTotal = 'nothing';
    }
  }

  formatMoney(paid) {
    const currency = this.environment.currency;
    if (currency === '£ Pieces of Unicorn Dust' || currency === '$ Pieces of Eight' || currency === '£ Old Money Pounds') {
      const symbol = currency.slice(0,1);
      const moneyType = currency.slice(2);
      this.grandTotal = `${symbol}${paid} ${moneyType}`
    } else {
      this.grandTotal = `${currency}${paid}`
    }
  }

}
