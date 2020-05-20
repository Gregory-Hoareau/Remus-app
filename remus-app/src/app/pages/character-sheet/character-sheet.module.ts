import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterSheetPageRoutingModule } from './character-sheet-routing.module';

import { CharacterSheetPage } from './character-sheet.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CharacterSheetPageRoutingModule,
        MatExpansionModule,
    ],
  declarations: [CharacterSheetPage],
})
export class CharacterSheetPageModule {}
