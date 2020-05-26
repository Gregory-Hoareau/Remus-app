import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MacroPageRoutingModule } from './macro-routing.module';

import { MacroPage } from './macro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MacroPageRoutingModule
  ],
  declarations: [MacroPage]
})
export class MacroPageModule {}
