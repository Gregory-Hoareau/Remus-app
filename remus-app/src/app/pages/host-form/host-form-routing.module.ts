import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostFormPage } from './host-form.page';

const routes: Routes = [
  {
    path: '',
    component: HostFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostFormPageRoutingModule {}
