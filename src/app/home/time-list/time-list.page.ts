import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Environment, EnvironmentStorageService } from 'src/app/services/environment-storage.service';
import { Item, ItemStorageService } from 'src/app/services/item-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.page.html',
  styleUrls: ['./time-list.page.scss'],
})
export class TimeListPage implements OnInit {

  times: Array<Item> = [];

  constructor(
    private router: Router,
    public itemStorageService: ItemStorageService,
    private dataService: DataServiceService,
    private alertController: AlertController,
    private environmentStorageService: EnvironmentStorageService,

  ) { }

  ngOnInit() {
    this.getTimes();
  }

  getTimes(){
    this.itemStorageService.getItems().then((items) => {
      if (items && items.length > 0) {
        let times = items.filter((item) => {
          return item.environmentID === this.dataService.environment.id;
        })
        this.formatTimes(times);
      }
    })
  }

  formatTimes(times) {
    times.sort((a, b) => b.id - a.id);
    const formattedTimes = []
    times.forEach((time) => {
      const minutes = (time.duration / 60);
      const seconds = (minutes % 1) * 60;
      if (minutes < 1) {
        const formattedDuration = seconds.toFixed(0) + ' secs'
        formattedTimes.push({...time, formattedDuration})
      } else {
        const formattedDuration = Math.floor(minutes).toFixed(0) + ' mins ' + seconds.toFixed(0) + ' secs'
        formattedTimes.push({...time, formattedDuration})
      }
    })
    this.times = formattedTimes;
  }

  async handleDeleteClick(item) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'This action will delete this time. Are you sure you want to do this? This action cannot be reversed.',
      cssClass: "alert-class",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "alert-cancel-button",
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: "alert-confirm-button",
          handler: () => {
            this.deleteTime(item);
          }
        }
      ]
    })
    alert.present();
  }

  deleteTime(item) {
    this.itemStorageService.deleteItem(item.id).then((items) => {
      let times = items.filter((item) => {
        return item.environmentID === this.dataService.environment.id;
      })
      this.formatTimes(times);
    })
  }

  handleEditTimeClick(item) {
    const newItem = this.presentNewTimeEntryAlert(item).then((newItem) => {
     
    })
  }

  async presentNewTimeEntryAlert(item) {
    const alert = await this.alertController.create({
      header: 'Enter New Time in Minutes',
      cssClass: "alert-class",
      inputs: [
        {
          name: 'time',
          type: 'number',
          placeholder: 'Enter Minutes'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "alert-cancel-button",
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Update',
          cssClass: "alert-confirm-button",
          handler: (alertData) => {
            item.duration = parseFloat(alertData.time) * 60;
            this.itemStorageService.updateItem(item).then((items) => {
              let times = items.filter((item) => {
                return item.environmentID === this.dataService.environment.id;
              })
              this.formatTimes(times);
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async addNewTimeAlert() {
    const alert = await this.alertController.create({
      header: 'Add a Time',
      cssClass: "alert-class",
      inputs: [
        {
          name: 'time',
          type: 'number',
          placeholder: 'Enter Minutes'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "alert-cancel-button",
          handler: (data) => {
            console.log('Cancel');
          }
        }, {
          text: 'Add',
          cssClass: "alert-confirm-button",
          handler: (alertData) => {
            const duration = parseFloat(alertData.time) * 60;
            const environmentID = this.dataService.environment.id;
            const createdAt = moment.now()
            const paidRaw = (this.dataService.environment.hourlyRate / 3600) * duration;
            const newItem = {
              id: this.times.length > 0 ? this.times[0].id + 1 : 1,
              environmentID,
              duration,
              createdAt,
              worth: paidRaw
            }
            this.itemStorageService.addItem(newItem).then((items) => {
              let times = items.filter((item) => {
                return item.environmentID === this.dataService.environment.id;
              })
              this.formatTimes(times);
              this.environmentStorageService.updateEnvironment(this.dataService.environment)
            })
          }
        }
      ]
    });
    await alert.present();
  }

  goBack(){
    this.router.navigate([''])
  }
}
