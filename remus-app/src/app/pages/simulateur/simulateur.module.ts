import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulateurPageRoutingModule } from './simulateur-routing.module'
import { IonicModule } from '@ionic/angular';


import { SimulateurPage } from './simulateur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulateurPageRoutingModule
  ],
  declarations: [SimulateurPage]
})
export class SimulateurPageModule {}
