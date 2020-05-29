import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulateurPageRoutingModule } from './simulateur-routing.module'
import { IonicModule } from '@ionic/angular';


import { SimulateurPage } from './simulateur.page';
import { RollHistoryComponent } from 'src/app/components/roll-history/roll-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulateurPageRoutingModule,
  ],
  declarations: [
    SimulateurPage,
    RollHistoryComponent
  ],
  exports: [
    RollHistoryComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SimulateurPageModule {}
