import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulateurPage } from './simulateur.page';

const routes: Routes = [
  {
    path: '',
    component: SimulateurPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SimulateurPageRoutingModule {}
