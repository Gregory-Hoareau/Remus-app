import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulateurPageRoutingModule } from './simulateur-routing.module'
import { IonicModule } from '@ionic/angular';


import { SimulateurPage } from './simulateur.page';
import { RollHistoryComponent } from 'src/app/components/roll-history/roll-history.component';
import { RollMacroComponent} from '../../components/roll-macro/roll-macro.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Gyroscope} from '@ionic-native/gyroscope/ngx';
import {DeviceMotion} from '@ionic-native/device-motion/ngx';
import {Shake} from '@ionic-native/shake/ngx';

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
  providers: [
    Gyroscope,
      DeviceMotion,
      Shake
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SimulateurPageModule {}
