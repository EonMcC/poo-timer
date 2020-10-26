import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-poobert',
  templateUrl: './poobert.component.html',
  styleUrls: ['./poobert.component.scss'],
})
export class PoobertComponent implements AfterViewInit {

  // user: User;
  pooStreak: number;

  poobertEmotion = 'normal';
  preTimerEmotions = ['waiting', 'tap-start', 'ima-poo']
  emotions = ['ima-poo']
  iteration = 0;

  constructor(
    private dataService: DataServiceService,
    public environmentStorageService: EnvironmentStorageService
  ) { }

  ngAfterViewInit() {
    setInterval(() => {
      if (this.dataService.environment && this.dataService.environment.streak > 0 && !this.emotions.includes('streak')) {
        this.emotions.push('streak')
      };
      if (this.dataService.environment && this.dataService.environment.name === 'Poo' && !this.emotions.includes('boss')) {
        this.emotions.push('boss');
        this.preTimerEmotions.push('boss');
      }
      if (this.dataService.startTime !== undefined) {
        if (this.iteration % 2 !== 0) {
          const index = Math.floor(Math.random() * this.emotions.length);
          this.poobertEmotion = this.emotions[index];
          this.iteration += 1
        } else {
          this.poobertEmotion = 'normal';
          this.iteration += 1;
        }
      } else {
        if (this.iteration % 2 !== 0) {
          const index = Math.floor(Math.random() * this.preTimerEmotions.length);
          this.poobertEmotion = this.preTimerEmotions[index];
          this.iteration += 1
        } else {
          this.poobertEmotion = 'normal';
          this.iteration += 1;
        }
      }
    }, 1000);

  }

  // ngAfterViewInit() {
    // setTimeout(() => {
    //   this.user = this.dataService.user;
    //   console.log(this.user)
    //   this.setPooStreak()
    // }, 3000)
  // }

  setPooStreak() {
    // if (this.user.pooStreak && this.user.pooStreak > 1) {
    //   this.pooStreak = this.user.pooStreak;
    //   this.emotions.push('wow');
    // }
  }

}
