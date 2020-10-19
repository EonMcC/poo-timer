import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  grandTotal: string;
  signupDate: string;

  constructor(
      private router: Router,
      private userStorageService: UserStorageService
    ) { }

  ngOnInit() {
    this.userStorageService.getUser().then((user) => {
      this.user = user;
      this.calculateGrandTotal();
      this.calculateSignupDate();
    });
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  calculateSignupDate() {
    this.signupDate = moment(this.user.signupDate).format('MMM \'YY');
  }

  calculateGrandTotal() {
    const time = this.user.totalPooTime;
    const hourlyRate = this.user.hourlyRate;
    if (time) {
      const paidNumber = ((hourlyRate / 3600) * time);
      if (paidNumber < .01) {
        const paid = paidNumber.toFixed(3);
        this.formatMoney(paid);
      } else {
        const paid = paidNumber.toFixed(2);
        this.formatMoney(paid);
      }
    } else {
      this.grandTotal = 'nothing';
    }
  }

  formatMoney(paid) {
    const currency = this.user.currency;
    if (currency === '£ Unicorn Dust' || currency === '$ Pieces of Eight' || currency === '£ Old Money') {
      const symbol = currency.slice(0,1);
      const moneyType = currency.slice(2);
      this.grandTotal = `${symbol}${paid} ${moneyType}`
    } else {
      this.grandTotal = `${currency}${paid}`
    }
  }

}
