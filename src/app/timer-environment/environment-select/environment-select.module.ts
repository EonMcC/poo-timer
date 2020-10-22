import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentSelectPageRoutingModule } from './environment-select-routing.module';

import { EnvironmentSelectPage } from './environment-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentSelectPageRoutingModule
  ],
  declarations: [EnvironmentSelectPage]
})
export class EnvironmentSelectPageModule {}
