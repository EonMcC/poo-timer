import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentSetupPage } from './environment-setup.page';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentSetupPageRoutingModule {}
