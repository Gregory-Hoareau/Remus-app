import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePageRoutingModule
  ],
  declarations: [HistoriquePage]
})
export class HistoriquePageModule {}
