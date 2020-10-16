import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-poobert',
  templateUrl: './poobert.component.html',
  styleUrls: ['./poobert.component.scss'],
})
export class PoobertComponent implements OnInit {

  poobertEmotion = 'normal';
  emotions = ['normal', 'shocked', 'creepy']

  constructor(
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    setInterval(() => {
      const index = Math.floor(Math.random() * 3);
      this.poobertEmotion = this.emotions[index];
      console.log(this.emotions[index]);
    }, 10000);
  }

}
