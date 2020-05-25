import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DocPopupPage} from './doc-popup.page';

const routes: Routes = [
  {
    path: '',
    component: DocPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocPopupRoutingModule {}
