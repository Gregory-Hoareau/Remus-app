import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchivementPage } from './achivement.page';

const routes: Routes = [
  {
    path: '',
    component: AchivementPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchivementPageRoutingModule {}
