import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadCharacterPageRoutingModule } from './load-character-routing.module';

import { LoadCharacterPage } from './load-character.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadCharacterPageRoutingModule,
  ],
  declarations: [LoadCharacterPage]
})
export class LoadCharacterPageModule {}
