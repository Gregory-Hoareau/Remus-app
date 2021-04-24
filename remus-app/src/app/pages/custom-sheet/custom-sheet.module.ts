import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomSheetPageRoutingModule } from './custom-sheet-routing.module';

import { CustomSheetPage } from './custom-sheet.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomSheetPageRoutingModule,
    MatExpansionModule,
  ],
  declarations: [CustomSheetPage]
})
export class CustomSheetPageModule {}
