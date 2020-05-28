import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SessionHomePage } from './sessionHome.page';

import {
  SessionHomePageRoutingModule,
} from './sessionHome-routing.module';
import {DocPopupModule} from '../doc-popup/doc-popup.module';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import {CharacterSheetPageModule} from '../character-sheet/character-sheet.module'
import { SelectCharacterPageModule } from '../select-character/select-character.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionHomePageRoutingModule,
    DocPopupModule,
    CharacterSheetPageModule,
    SelectCharacterPageModule
  ],
  declarations: [SessionHomePage]
})
export class SessionHomePageModule {}
