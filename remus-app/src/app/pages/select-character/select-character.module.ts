import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCharacterPageRoutingModule } from './select-character-routing.module';

import { SelectCharacterPage } from './select-character.page';
import { CharacterSheetPageModule } from '../character-sheet/character-sheet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCharacterPageRoutingModule,
    CharacterSheetPageModule,
  ],
  declarations: [SelectCharacterPage]
})
export class SelectCharacterPageModule {}
