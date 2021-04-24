import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationSenderPageRoutingModule } from './invitation-sender-routing.module';

import { InvitationSenderPage } from './invitation-sender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationSenderPageRoutingModule
  ],
  declarations: [InvitationSenderPage]
})
export class InvitationSenderPageModule {}
