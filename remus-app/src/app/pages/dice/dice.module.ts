import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DicePageRoutingModule } from './dice-routing.module';

import { DicePage } from './dice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DicePageRoutingModule
  ],
  declarations: [DicePage]
})
export class DicePageModule {}
