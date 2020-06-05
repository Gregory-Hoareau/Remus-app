import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCharacterPageRoutingModule } from './select-character-routing.module';

import { SelectCharacterPage } from './select-character.page';
import { CharacterSheetPageModule } from '../character-sheet/character-sheet.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadCharacterPageModule } from '../load-character/load-character.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCharacterPageRoutingModule,
    CharacterSheetPageModule,
    FontAwesomeModule,
    LoadCharacterPageModule,
  ],
  declarations: [
    SelectCharacterPage
  ]
})
export class SelectCharacterPageModule {}
