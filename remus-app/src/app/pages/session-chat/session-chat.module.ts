import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionChatPageRoutingModule } from './session-chat-routing.module';

import { SessionChatPage } from './session-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionChatPageRoutingModule
  ],
  declarations: [SessionChatPage]
})
export class SessionChatPageModule {}
