import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionHomePageRoutingModule } from './session-home-routing.module';

import { SessionHomePage } from './session-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionHomePageRoutingModule
  ],
  declarations: [SessionHomePage]
})
export class SessionHomePageModule {}
