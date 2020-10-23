import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataGuardGuard } from './data-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    // canLoad: [DataGuardGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'initial-setup',
    loadChildren: () => import('./initial-setup/initial-setup.module').then( m => m.InitialSetupPageModule)
  },
  {
    path: 'environment-select',
    loadChildren: () => import('./timer-environment/environment-select/environment-select.module').then( m => m.EnvironmentSelectPageModule)
  },
  {
    path: 'environment-setup',
    loadChildren: () => import('./timer-environment/environment-setup/environment-setup.module').then( m => m.EnvironmentSetupPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
