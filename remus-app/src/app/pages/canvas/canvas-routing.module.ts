import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanvasPage } from './canvas.page';

const routes: Routes = [
  {
    path: '',
    component: CanvasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanvasPageRoutingModule {}
