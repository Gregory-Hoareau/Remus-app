import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanvasPageRoutingModule } from './canvas-routing.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { CanvasPage } from './canvas.page';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanvasPageRoutingModule,
  ],
  declarations: [CanvasPage],
  providers: [
      ScreenOrientation,
      AndroidPermissions]
})
export class CanvasPageModule {}
