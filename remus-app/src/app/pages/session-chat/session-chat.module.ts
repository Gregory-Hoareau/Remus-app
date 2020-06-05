import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionChatPageRoutingModule } from './session-chat-routing.module';

import { SessionChatPage } from './session-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SessionChatPage]
})
export class SessionChatPageModule {}
