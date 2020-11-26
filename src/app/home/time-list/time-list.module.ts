import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeListPageRoutingModule } from './time-list-routing.module';

import { TimeListPage } from './time-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeListPageRoutingModule
  ],
  declarations: [TimeListPage]
})
export class TimeListPageModule {}
