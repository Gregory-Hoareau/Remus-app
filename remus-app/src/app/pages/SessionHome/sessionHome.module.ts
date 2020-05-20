import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SessionHomePage } from './sessionHome.page';

import {
  SessionHomePageRoutingModule,
} from './sessionHome-routing.module';


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
