import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-poobert',
  templateUrl: './poobert.component.html',
  styleUrls: ['./poobert.component.scss'],
})
export class PoobertComponent implements OnInit {

  poobertEmotion = 'normal';
  emotions = ['shocked', 'creepy']
  iteration = 0;

  constructor(
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    setInterval(() => {
      if (this.iteration % 2 !== 0) {
        const index = Math.floor(Math.random() * 2);
        this.poobertEmotion = this.emotions[index];
        this.iteration += 1
      } else {
        this.poobertEmotion = 'normal';
        this.iteration += 1;
      }
    }, 10000);
  }

}
