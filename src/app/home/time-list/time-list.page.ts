import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.page.html',
  styleUrls: ['./time-list.page.scss'],
})
export class TimeListPage implements OnInit {

  times = [];

  constructor(
    private router: Router,
    public itemStorageService: ItemStorageService,
    private dataService: DataServiceService,
  ) { }

  ngOnInit() {
    this.getTimes()
  }

  getTimes(){
    this.itemStorageService.getItems().then((items) => {
      console.log(items)
      let times = items.filter((item) => {
        return item.environmentID === this.dataService.environment.id;
      })
      this.formatTimes(times);
    })
  }

  formatTimes(times) {
    const formattedTimes = []
    times.forEach((time) => {
      const minutes = (time.duration / 60);
      const seconds = (minutes % 1) * 60;
      if (minutes < 1) {
        const formattedDuration = seconds.toFixed(0) + ' secs'
        formattedTimes.push({...time, formattedDuration})
      } else {
        const formattedDuration = minutes.toFixed(0) + ' mins ' + seconds.toFixed(0) + ' secs'
        formattedTimes.push({...time, formattedDuration})
      }
    })
    this.times = formattedTimes;
  }

  goBack(){
    this.router.navigate(['/home'])
  }
}
