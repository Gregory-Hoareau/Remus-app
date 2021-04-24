import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationSenderPage } from './invitation-sender.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationSenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationSenderPageRoutingModule {}
