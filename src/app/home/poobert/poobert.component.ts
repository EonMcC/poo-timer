import { Component, AfterViewInit, OnInit } from '@angular/core';
import { EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';
import { DataServiceService } from '../../services/data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-poobert',
  templateUrl: './poobert.component.html',
  styleUrls: ['./poobert.component.scss'],
})
export class PoobertComponent implements AfterViewInit, OnInit {

  pooStreak: number;

  poobertEmotion = 'normal';
  preTimerEmotions = ['waiting', 'tap-start', 'ima-poo', 'dyk-seconds-year', 'relative', 'washHands']
  emotions = ['ima-poo', 'dyk-seconds-year', 'relative', 'washHands']
  iteration = 0;
  totalTimeMs: number;
  items: Array<Item>
  streak: number;
  longestTime: number;
  intervalFn: NodeJS.Timer;

  constructor(
    private dataService: DataServiceService,
    public environmentStorageService: EnvironmentStorageService,
    private itemStorageService: ItemStorageService
  ) { }

  ngOnInit() {
    this.getTimes()
  }

  ngAfterViewInit() {
    this.intervalFn = setInterval(() => {
      if (this.dataService.environment && !this.emotions.includes('longest') && this.longestTime < this.dataService.environment.currentTime) {
        this.emotions.push('longest')
      } else if (this.emotions.includes('longest') && this.dataService.environment.currentTime === 0) {
        this.emotions.splice(this.emotions.indexOf('longest'), 1)
      }
      if (this.dataService.environment && this.streak > 1 && !this.emotions.includes('streak')) {
        this.emotions.push('streak')
      };
      if (this.dataService.environment && this.dataService.environment.name === 'Poo' && !this.emotions.includes('boss')) {
        this.emotions.push('boss');
        this.preTimerEmotions.push('boss');
      }
      if (this.dataService.environment && this.dataService.environment.name === 'Poo' && !this.emotions.includes('ownTime')) {
        this.emotions.push('ownTime');
        this.preTimerEmotions.push('ownTime');
      }
      if (this.dataService.environment && this.dataService.environment.name === 'Poo' && !this.emotions.includes('pool')) {
        this.emotions.push('pool');
      }
      if (this.dataService.environment && this.dataService.environment.name === 'Poo' && !this.emotions.includes('water')) {
        this.emotions.push('water');
      }
      if (this.dataService.environment.startTime !== 0) {
        if (this.iteration % 2 !== 0) {
          const index = Math.floor(Math.random() * this.emotions.length);
          this.poobertEmotion = this.emotions[index];
          console.log(this.poobertEmotion)
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
    }, 750);
  }

  getTimes(){
    console.log('gettimes')
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
        this.getLongestTime();
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

  getLongestTime() {
    console.log('items', this.items)
    this.longestTime = this.items.reduce((min, item) => item.duration > min ? item.duration : min, this.items[0].duration)
  }

}
