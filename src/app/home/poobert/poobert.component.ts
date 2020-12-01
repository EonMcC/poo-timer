import { Component, AfterViewInit } from '@angular/core';
import { EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';
import { DataServiceService } from '../../services/data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-poobert',
  templateUrl: './poobert.component.html',
  styleUrls: ['./poobert.component.scss'],
})
export class PoobertComponent implements AfterViewInit {

  pooStreak: number;

  poobertEmotion = 'normal';
  preTimerEmotions = ['waiting', 'tap-start', 'ima-poo', 'dyk-seconds-year', 'relative']
  emotions = ['ima-poo', 'dyk-seconds-year', 'relative']
  iteration = 0;
  totalTimeMs: number;
  items: Array<Item>
  streak: number;

  constructor(
    private dataService: DataServiceService,
    public environmentStorageService: EnvironmentStorageService,
    private itemStorageService: ItemStorageService
  ) { }

  ionViewWillEnter() {
    this.getTimes()
  }

  ngAfterViewInit() {
    setInterval(() => {
      // if (this.dataService.environment && !this.emotions.includes('longest') && this.dataService.environment.longestTime < this.dataService.environment.currentTime) {
      //   this.emotions.push('longest')
      // } else if (this.emotions.includes('longest') && this.dataService.environment.currentTime === undefined) {
      //   this.emotions.splice(this.emotions.indexOf('longest'), 1)
      // }
      if (this.dataService.environment && this.streak > 1 && !this.emotions.includes('streak')) {
        this.emotions.push('streak')
      };
      if (this.dataService.environment && this.dataService.environment.name === 'Poo' && !this.emotions.includes('boss')) {
        this.emotions.push('boss');
        this.preTimerEmotions.push('boss');
      }
      if (this.dataService.environment.startTime !== 0) {
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

  getTimes(){
    this.itemStorageService.getItems().then((items) => {
      this.totalTimeMs = 0;
      this.items = items.filter((item) => {
        return item.environmentID === this.dataService.environment.id;
      })
      this.items.reverse();
      if (this.items.length > 0) {
        this.items.forEach((item) => {
          this.totalTimeMs += item.duration * 1000
        });
        this.calcStreak();
      }
    })
  }

  calcStreak() {
    const dates = [];
    this.items.forEach((item) => {
      dates.push(moment(item.createdAt).startOf('day'))
    })

    let streak = 0;
    if (moment().isSame(dates[0], 'day')) {
      streak = 1;
      let curDate = moment(new Date()).startOf('day');
      dates.forEach((date) => {
        const diffTime = curDate.diff(date, 'days');
        if (diffTime === 1) {
          streak += 1;
          curDate = date;
        } else {
          streak = streak;
        }
      })
    }
    this.streak = streak;
  }

}
