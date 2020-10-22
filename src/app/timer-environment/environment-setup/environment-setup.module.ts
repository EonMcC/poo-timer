import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentSetupPageRoutingModule } from './environment-setup-routing.module';

import { EnvironmentSetupPage } from './environment-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentSetupPageRoutingModule
  ],
  declarations: [EnvironmentSetupPage]
})
export class EnvironmentSetupPageModule {}
