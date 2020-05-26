import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulateurPage } from './simulateur.page';

const routes: Routes = [
  {
    path: 'simulateur',
    component: SimulateurPage,
    children: [
      {
        path: 'dice',
        children: [
          {
            path: '',
            loadChildren: () => import('../dice/dice.module').then(m => m.DicePageModule)
          }
        ]
      },
      {
        path: 'macro',
        children: [
          {
            path: '',
            loadChildren: () => import('../macro/macro.module').then(m => m.MacroPageModule)
          }
        ]
      },
      {
        path: 'historique',
        children: [
          {
            path: '',
            loadChildren: () => import('../historique/historique.module').then(m => m.HistoriquePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/simulateur/dice',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/simulateur/simulateur/dice',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SimulateurPageRoutingModule {}
