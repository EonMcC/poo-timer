import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentSelectPage } from './environment-select.page';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentSelectPageRoutingModule {}
