import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdsourcingPage } from './crowdsourcing.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdsourcingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdsourcingPageRoutingModule {}
