import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-poobert',
  templateUrl: './poobert.component.html',
  styleUrls: ['./poobert.component.scss'],
})
export class PoobertComponent implements OnInit, AfterViewInit {

  // user: User;
  pooStreak: number;

  poobertEmotion = 'normal';
  emotions = ['boss']
  iteration = 0;

  constructor(
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    setInterval(() => {
      if (this.iteration % 2 !== 0) {
        const index = Math.floor(Math.random() * this.emotions.length);
        this.poobertEmotion = this.emotions[index];
        this.iteration += 1
      } else {
        this.poobertEmotion = 'normal';
        this.iteration += 1;
      }
    }, 10000);

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.user = this.dataService.user;
    //   console.log(this.user)
    //   this.setPooStreak()
    // }, 3000)
  }

  setPooStreak() {
    // if (this.user.pooStreak && this.user.pooStreak > 1) {
    //   this.pooStreak = this.user.pooStreak;
    //   this.emotions.push('wow');
    // }
  }

}
