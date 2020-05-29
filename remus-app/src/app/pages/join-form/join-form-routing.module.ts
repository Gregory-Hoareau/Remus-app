import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinFormPage } from './join-form.page';

const routes: Routes = [
  {
    path: '',
    component: JoinFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinFormPageRoutingModule {}
