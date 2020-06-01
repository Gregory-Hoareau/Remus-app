import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulateurPageRoutingModule } from './simulateur-routing.module'
import { IonicModule } from '@ionic/angular';


import { SimulateurPage } from './simulateur.page';
import { RollHistoryComponent } from 'src/app/components/roll-history/roll-history.component';
import { RollMacroComponent} from '../../components/roll-macro/roll-macro.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SimulateurPageRoutingModule,
        FontAwesomeModule,
    ],
  declarations: [
    SimulateurPage,
    RollHistoryComponent,
      RollMacroComponent
  ],
  exports: [
    RollHistoryComponent,
      RollMacroComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SimulateurPageModule {}
