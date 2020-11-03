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

  // poobertEmotion = 'dyk-seconds-year';
  poobertEmotion = 'normal';
  preTimerEmotions = ['waiting', 'tap-start', 'ima-poo', 'dyk-seconds-year', 'relative']
  emotions = ['ima-poo', 'dyk-seconds-year', 'relative']
  iteration = 0;

  constructor(
    private dataService: DataServiceService,
    public environmentStorageService: EnvironmentStorageService
  ) { }

  ngAfterViewInit() {
    setInterval(() => {
      if (this.dataService.environment && !this.emotions.includes('longest') && this.dataService.environment.longestTime < this.dataService.currentTime) {
        this.emotions.push('longest')
      } else if (this.emotions.includes('longest') && this.dataService.currentTime === undefined) {
        this.emotions.splice(this.emotions.indexOf('longest'), 1)
      }
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
    }, 10000);
  }

}
