import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SharePopupPage} from './share-popup.page';

const routes: Routes = [
  {
    path: '',
    component: SharePopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharePopupRoutingModule {}
