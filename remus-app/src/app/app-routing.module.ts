import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dice',
    loadChildren: () => import('./pages/dice/dice.module').then(m => m.DicePageModule)
  },
  {
    path: 'host-form',
    loadChildren: () => import('./pages/host-form/host-form.module').then( m => m.HostFormPageModule)
  },
  {
    path: 'sessionHome',
    loadChildren : () => import('./pages/SessionHome/sessionHome.module').then(m => m.SessionHomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
