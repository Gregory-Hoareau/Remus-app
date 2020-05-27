import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';
import { RollHistoryComponent } from 'src/app/components/roll-history/roll-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePageRoutingModule,
  ],
  declarations: [
    HistoriquePage,
    RollHistoryComponent,
  ]
})
export class HistoriquePageModule {}
