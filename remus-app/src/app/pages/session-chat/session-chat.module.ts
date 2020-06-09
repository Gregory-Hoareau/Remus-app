import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionChatPageRoutingModule } from './session-chat-routing.module';

import { SessionChatPage } from './session-chat.page';
import { MessageComponent } from 'src/app/components/message/message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SessionChatPageRoutingModule,
  ],
  declarations: [
    SessionChatPage,
    MessageComponent
  ],
  exports: [MessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SessionChatPageModule {}
