import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MacroPage } from './macro.page';

const routes: Routes = [
  {
    path: '',
    component: MacroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacroPageRoutingModule {}
