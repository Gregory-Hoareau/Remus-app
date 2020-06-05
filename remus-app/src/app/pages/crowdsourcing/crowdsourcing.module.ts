import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdsourcingPageRoutingModule } from './crowdsourcing-routing.module';

import { CrowdsourcingPage } from './crowdsourcing.page';
import { CharacterSheetPageModule } from '../character-sheet/character-sheet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrowdsourcingPageRoutingModule,
    CharacterSheetPageModule,
  ],
  declarations: [CrowdsourcingPage]
})
export class CrowdsourcingPageModule {}
